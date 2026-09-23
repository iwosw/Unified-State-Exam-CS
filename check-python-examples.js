// node check-python-examples.js — проверка примеров из фотоподборки и синтаксиса шаблонов.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const examples = require("./python-examples.js");
const walkthroughs = require("./walkthroughs.js");

const env = { ...process.env, PYTHONIOENCODING: "utf-8" };
const ids = new Set();
for (const example of examples) {
  assert(!ids.has(example.id), `Повтор ID ${example.id}`);
  ids.add(example.id);
  assert(example.expected, `Нет контрольного вывода: ${example.id}`);
  const result = spawnSync("python", ["-c", example.code], {
    env, encoding: "utf8", timeout: 30000
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${example.id}: ${result.stderr}`);
  const actual = result.stdout.trim().replace(/\r/g, "").split("\n").join("; ");
  assert.equal(actual, example.expected, `${example.id}: неверный результат`);
  console.log(`OK ${example.id}: ${actual}`);
}

assert.deepEqual(walkthroughs.map((item) => item.number), Array.from({ length: 27 }, (_, i) => i + 1));
for (const walkthrough of walkthroughs) {
  assert.equal(walkthrough.reasoning.length, 3, `Нет трёх шагов у №${walkthrough.number}`);
  const result = spawnSync("python", ["-c", walkthrough.code], {
    env, encoding: "utf8", timeout: 30000
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `№${walkthrough.number}: ${result.stderr}`);
  const actual = result.stdout.trim().replace(/\r/g, "").split("\n").join("; ");
  assert.equal(actual, walkthrough.expected, `Неверный ответ у №${walkthrough.number}`);
  console.log(`OK задание ${walkthrough.number}: ${actual}`);
}

const app = fs.readFileSync("app.js", "utf8");
const templates = vm.runInNewContext(app.slice(0, app.indexOf("const tasks =")) + "\ncodeTemplates");
const snippets = Object.entries(templates).map(([name, versions]) => {
  assert.equal(typeof versions.python, "string", `${name}: отсутствует Python`);
  return [name, versions.python];
});
const syntax = spawnSync("python", ["-c", `import json, sys
for name, code in json.load(sys.stdin):
    compile(code, name, 'exec')
print('Python-шаблоны: синтаксис OK')`], {
  env, encoding: "utf8", input: JSON.stringify(snippets)
});
assert.ifError(syntax.error);
assert.equal(syntax.status, 0, syntax.stderr);
console.log(`${syntax.stdout.trim()} (${snippets.length})`);

const tempRoot = path.join(os.tmpdir(), "opencode");
fs.mkdirSync(tempRoot, { recursive: true });
const temp = fs.mkdtempSync(path.join(tempRoot, "ege-python-"));
const fixtures = {
  "3.csv": "id;Город;Количество;Баллы\n1;Москва;2;90\n",
  "9.csv": "1;2;3;4\n",
  "10.txt": "Информатика — это информатика.\n",
  "17.txt": "1\n3\n5\n",
  "24.txt": "BAAAB\n",
  "26.txt": "3 10\n2\n3\n6\n"
};
try {
  for (const [name, content] of Object.entries(fixtures)) {
    fs.writeFileSync(path.join(temp, name), content);
  }
  for (const [name, code] of snippets) {
    const result = spawnSync("python", ["-c", code], {
      cwd: temp, env, encoding: "utf8", timeout: 30000
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${name}: ${result.stderr}`);
    assert(result.stdout.trim(), `${name}: нет вывода для тестовых данных`);
  }
  console.log(`Python-шаблоны: запуск OK (${snippets.length})`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
