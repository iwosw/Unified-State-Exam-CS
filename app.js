const snippets = {
  theory: {
    python: `# перевод числа в разные системы\nn = 255\nprint(bin(n)[2:])\nprint(oct(n)[2:])\nprint(hex(n)[2:].upper())`,
    java: `int n = 255;\nSystem.out.println(Integer.toBinaryString(n));\nSystem.out.println(Integer.toOctalString(n));\nSystem.out.println(Integer.toHexString(n).toUpperCase());`,
    cpp: `int n = 255;\nstd::cout << std::bitset<16>(n) << "\\n";\nstd::cout << std::oct << n << "\\n";\nstd::cout << std::hex << std::uppercase << n << "\\n";`,
    rust: `let n = 255;\nprintln!("{:b}", n);\nprintln!("{:o}", n);\nprintln!("{:X}", n);`
  },
  logic: {
    python: `from itertools import product\nfor x, y, z in product([0, 1], repeat=3):\n    f = (not x or y) and (z == x)\n    print(x, y, z, int(f))`,
    java: `for (int x = 0; x <= 1; x++)\n  for (int y = 0; y <= 1; y++)\n    for (int z = 0; z <= 1; z++) {\n      boolean f = (! (x == 1) || y == 1) && ((z == 1) == (x == 1));\n      System.out.println(x + " " + y + " " + z + " " + (f ? 1 : 0));\n    }`,
    cpp: `for (int x = 0; x <= 1; ++x)\n  for (int y = 0; y <= 1; ++y)\n    for (int z = 0; z <= 1; ++z) {\n      bool f = (!x || y) && (z == x);\n      std::cout << x << ' ' << y << ' ' << z << ' ' << f << "\\n";\n    }`,
    rust: `for x in 0..=1 {\n    for y in 0..=1 {\n        for z in 0..=1 {\n            let f = ((x == 0) || y == 1) && ((z == 1) == (x == 1));\n            println!("{} {} {} {}", x, y, z, f as i32);\n        }\n    }\n}`
  },
  editor: {
    python: `s = "1" * 80\nwhile "111" in s or "222" in s:\n    s = s.replace("111", "2", 1)\n    s = s.replace("222", "1", 1)\nprint(s)`,
    java: `String s = "1".repeat(80);\nwhile (s.contains("111") || s.contains("222")) {\n  s = s.replaceFirst("111", "2");\n  s = s.replaceFirst("222", "1");\n}\nSystem.out.println(s);`,
    cpp: `std::string s(80, '1');\nwhile (s.find("111") != std::string::npos || s.find("222") != std::string::npos) {\n  if (auto p = s.find("111"); p != std::string::npos) s.replace(p, 3, "2");\n  if (auto p = s.find("222"); p != std::string::npos) s.replace(p, 3, "1");\n}\nstd::cout << s;`,
    rust: `let mut s = "1".repeat(80);\nwhile s.contains("111") || s.contains("222") {\n    s = s.replacen("111", "2", 1);\n    s = s.replacen("222", "1", 1);\n}\nprintln!("{}", s);`
  },
  loops: {
    python: `ans = []\nfor n in range(1, 1000):\n    r = bin(n)[2:]\n    r += r[-1]\n    if int(r, 2) > 130:\n        ans.append(n)\nprint(min(ans))`,
    java: `int best = Integer.MAX_VALUE;\nfor (int n = 1; n < 1000; n++) {\n  String r = Integer.toBinaryString(n);\n  r += r.charAt(r.length() - 1);\n  if (Integer.parseInt(r, 2) > 130) best = Math.min(best, n);\n}\nSystem.out.println(best);`,
    cpp: `int best = INT_MAX;\nfor (int n = 1; n < 1000; ++n) {\n  std::string r = std::bitset<16>(n).to_string();\n  r = r.substr(r.find('1'));\n  r += r.back();\n  if (std::stoi(r, nullptr, 2) > 130) best = std::min(best, n);\n}\nstd::cout << best;`,
    rust: `let mut best = i32::MAX;\nfor n in 1..1000 {\n    let mut r = format!("{:b}", n);\n    let last = r.chars().last().unwrap();\n    r.push(last);\n    if i32::from_str_radix(&r, 2).unwrap() > 130 {\n        best = best.min(n);\n    }\n}\nprintln!("{}", best);`
  },
  masks: {
    python: `for x in range(10):\n    n = int(f"12{x}45")\n    if n % 37 == 0:\n        print(n)`,
    java: `for (int x = 0; x <= 9; x++) {\n  int n = Integer.parseInt("12" + x + "45");\n  if (n % 37 == 0) System.out.println(n);\n}`,
    cpp: `for (int x = 0; x <= 9; ++x) {\n  int n = std::stoi("12" + std::to_string(x) + "45");\n  if (n % 37 == 0) std::cout << n << "\\n";\n}`,
    rust: `for x in 0..=9 {\n    let n: i32 = format!("12{}45", x).parse().unwrap();\n    if n % 37 == 0 {\n        println!("{}", n);\n    }\n}`
  },
  files: {
    python: `with open("17.txt") as f:\n    a = [int(x) for x in f]\ncount = 0\nbest = -10**18\nfor i in range(len(a) - 1):\n    if (a[i] + a[i + 1]) % 2 == 0:\n        count += 1\n        best = max(best, a[i] + a[i + 1])\nprint(count, best)`,
    java: `List<Integer> a = Files.lines(Path.of("17.txt")).map(Integer::parseInt).toList();\nint count = 0, best = Integer.MIN_VALUE;\nfor (int i = 0; i < a.size() - 1; i++) {\n  int sum = a.get(i) + a.get(i + 1);\n  if (sum % 2 == 0) {\n    count++;\n    best = Math.max(best, sum);\n  }\n}\nSystem.out.println(count + " " + best);`,
    cpp: `std::ifstream in("17.txt");\nstd::vector<int> a;\nfor (int x; in >> x; ) a.push_back(x);\nint count = 0, best = INT_MIN;\nfor (size_t i = 0; i + 1 < a.size(); ++i) {\n  int sum = a[i] + a[i + 1];\n  if (sum % 2 == 0) { ++count; best = std::max(best, sum); }\n}\nstd::cout << count << ' ' << best;`,
    rust: `let text = std::fs::read_to_string("17.txt").unwrap();\nlet a: Vec<i32> = text.lines().map(|s| s.parse().unwrap()).collect();\nlet (mut count, mut best) = (0, i32::MIN);\nfor i in 0..a.len() - 1 {\n    let sum = a[i] + a[i + 1];\n    if sum % 2 == 0 {\n        count += 1;\n        best = best.max(sum);\n    }\n}\nprintln!("{} {}", count, best);`
  },
  strings: {
    python: `s = input().strip()\nans = 0\ncur = 1\nfor i in range(1, len(s)):\n    cur = cur + 1 if s[i] != s[i - 1] else 1\n    ans = max(ans, cur)\nprint(ans)`,
    java: `String s = new Scanner(System.in).nextLine();\nint ans = 1, cur = 1;\nfor (int i = 1; i < s.length(); i++) {\n  cur = s.charAt(i) != s.charAt(i - 1) ? cur + 1 : 1;\n  ans = Math.max(ans, cur);\n}\nSystem.out.println(ans);`,
    cpp: `std::string s; std::cin >> s;\nint ans = 1, cur = 1;\nfor (size_t i = 1; i < s.size(); ++i) {\n  cur = s[i] != s[i - 1] ? cur + 1 : 1;\n  ans = std::max(ans, cur);\n}\nstd::cout << ans;`,
    rust: `use std::io;\nlet mut s = String::new();\nio::stdin().read_line(&mut s).unwrap();\nlet bytes = s.trim().as_bytes();\nlet (mut ans, mut cur) = (1, 1);\nfor i in 1..bytes.len() {\n    cur = if bytes[i] != bytes[i - 1] { cur + 1 } else { 1 };\n    ans = ans.max(cur);\n}\nprintln!("{}", ans);`
  },
  combinatorics: {
    python: `from itertools import product\ncount = 0\nfor w in product("ABCX", repeat=5):\n    s = "".join(w)\n    if s.count("X") == 1:\n        count += 1\nprint(count)`,
    java: `char[] a = {'A', 'B', 'C', 'X'};\nint count = 0;\nfor (char c1 : a) for (char c2 : a) for (char c3 : a)\nfor (char c4 : a) for (char c5 : a) {\n  String s = "" + c1 + c2 + c3 + c4 + c5;\n  if (s.chars().filter(ch -> ch == 'X').count() == 1) count++;\n}\nSystem.out.println(count);`,
    cpp: `std::string a = "ABCX";\nint count = 0;\nfor (char c1 : a) for (char c2 : a) for (char c3 : a)\nfor (char c4 : a) for (char c5 : a) {\n  std::string s = {c1, c2, c3, c4, c5};\n  count += std::count(s.begin(), s.end(), 'X') == 1;\n}\nstd::cout << count;`,
    rust: `let a = ['A', 'B', 'C', 'X'];\nlet mut count = 0;\nfor &c1 in &a { for &c2 in &a { for &c3 in &a {\nfor &c4 in &a { for &c5 in &a {\n    let s = [c1, c2, c3, c4, c5];\n    if s.iter().filter(|&&ch| ch == 'X').count() == 1 { count += 1; }\n}}}}}\nprintln!("{}", count);`
  },
  recursion: {
    python: `def f(n):\n    if n <= 2:\n        return 1\n    return f(n - 1) + f(n - 2)\nprint(f(10))`,
    java: `static int f(int n) {\n  if (n <= 2) return 1;\n  return f(n - 1) + f(n - 2);\n}`,
    cpp: `int f(int n) {\n  if (n <= 2) return 1;\n  return f(n - 1) + f(n - 2);\n}`,
    rust: `fn f(n: i32) -> i32 {\n    if n <= 2 { 1 } else { f(n - 1) + f(n - 2) }\n}`
  },
  graph: {
    python: `from collections import deque\ng = {1: [2, 3], 2: [4], 3: [4], 4: []}\nq = deque([(1, 0)])\nseen = {1}\nwhile q:\n    v, d = q.popleft()\n    if v == 4:\n        print(d)\n        break\n    for to in g[v]:\n        if to not in seen:\n            seen.add(to)\n            q.append((to, d + 1))`,
    java: `Map<Integer, List<Integer>> g = Map.of(1, List.of(2, 3), 2, List.of(4), 3, List.of(4), 4, List.of());\nQueue<int[]> q = new ArrayDeque<>();\nSet<Integer> seen = new HashSet<>();\nq.add(new int[]{1, 0});\nseen.add(1);\nwhile (!q.isEmpty()) {\n  int[] cur = q.poll();\n  if (cur[0] == 4) { System.out.println(cur[1]); break; }\n  for (int to : g.get(cur[0])) if (seen.add(to)) q.add(new int[]{to, cur[1] + 1});\n}`,
    cpp: `std::map<int, std::vector<int>> g{{1,{2,3}}, {2,{4}}, {3,{4}}, {4,{}}};\nstd::queue<std::pair<int,int>> q;\nstd::set<int> seen{1};\nq.push({1, 0});\nwhile (!q.empty()) {\n  auto [v, d] = q.front(); q.pop();\n  if (v == 4) { std::cout << d; break; }\n  for (int to : g[v]) if (!seen.count(to)) { seen.insert(to); q.push({to, d + 1}); }\n}`,
    rust: `use std::collections::{HashMap, HashSet, VecDeque};\nlet g = HashMap::from([(1, vec![2, 3]), (2, vec![4]), (3, vec![4]), (4, vec![])]);\nlet mut q = VecDeque::from([(1, 0)]);\nlet mut seen = HashSet::from([1]);\nwhile let Some((v, d)) = q.pop_front() {\n    if v == 4 { println!("{}", d); break; }\n    for &to in &g[&v] {\n        if seen.insert(to) { q.push_back((to, d + 1)); }\n    }\n}`
  },
  games: {
    python: `def win(x):\n    if x >= 43:\n        return False\n    moves = [x + 1, x * 2]\n    return any(not win(y) for y in moves)\nprint(win(10))`,
    java: `static boolean win(int x) {\n  if (x >= 43) return false;\n  int[] moves = {x + 1, x * 2};\n  for (int y : moves) if (!win(y)) return true;\n  return false;\n}`,
    cpp: `bool win(int x) {\n  if (x >= 43) return false;\n  return !win(x + 1) || !win(x * 2);\n}`,
    rust: `fn win(x: i32) -> bool {\n    if x >= 43 { return false; }\n    !win(x + 1) || !win(x * 2)\n}`
  },
  dp: {
    python: `n = 10\ndp = [0] * (n + 1)\ndp[1] = 1\nfor i in range(1, n + 1):\n    if i + 1 <= n:\n        dp[i + 1] += dp[i]\n    if i * 2 <= n:\n        dp[i * 2] += dp[i]\nprint(dp[n])`,
    java: `int n = 10;\nint[] dp = new int[n + 1];\ndp[1] = 1;\nfor (int i = 1; i <= n; i++) {\n  if (i + 1 <= n) dp[i + 1] += dp[i];\n  if (i * 2 <= n) dp[i * 2] += dp[i];\n}\nSystem.out.println(dp[n]);`,
    cpp: `int n = 10;\nstd::vector<int> dp(n + 1);\ndp[1] = 1;\nfor (int i = 1; i <= n; ++i) {\n  if (i + 1 <= n) dp[i + 1] += dp[i];\n  if (i * 2 <= n) dp[i * 2] += dp[i];\n}\nstd::cout << dp[n];`,
    rust: `let n = 10usize;\nlet mut dp = vec![0; n + 1];\ndp[1] = 1;\nfor i in 1..=n {\n    if i + 1 <= n { dp[i + 1] += dp[i]; }\n    if i * 2 <= n { dp[i * 2] += dp[i]; }\n}\nprintln!("{}", dp[n]);`
  },
  robot: {
    python: `grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nn, m = len(grid), len(grid[0])\ndp = [[0] * m for _ in range(n)]\ndp[0][0] = grid[0][0]\nfor i in range(n):\n    for j in range(m):\n        if i: dp[i][j] = max(dp[i][j], dp[i - 1][j] + grid[i][j])\n        if j: dp[i][j] = max(dp[i][j], dp[i][j - 1] + grid[i][j])\nprint(dp[-1][-1])`,
    java: `int[][] a = {{1,2,3},{4,5,6},{7,8,9}};\nint n = a.length, m = a[0].length;\nint[][] dp = new int[n][m];\ndp[0][0] = a[0][0];\nfor (int i = 0; i < n; i++)\n  for (int j = 0; j < m; j++) {\n    if (i > 0) dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + a[i][j]);\n    if (j > 0) dp[i][j] = Math.max(dp[i][j], dp[i][j - 1] + a[i][j]);\n  }\nSystem.out.println(dp[n - 1][m - 1]);`,
    cpp: `std::vector<std::vector<int>> a{{1,2,3},{4,5,6},{7,8,9}};\nint n = a.size(), m = a[0].size();\nstd::vector<std::vector<int>> dp(n, std::vector<int>(m));\ndp[0][0] = a[0][0];\nfor (int i = 0; i < n; ++i)\n  for (int j = 0; j < m; ++j) {\n    if (i) dp[i][j] = std::max(dp[i][j], dp[i - 1][j] + a[i][j]);\n    if (j) dp[i][j] = std::max(dp[i][j], dp[i][j - 1] + a[i][j]);\n  }\nstd::cout << dp[n - 1][m - 1];`,
    rust: `let a = vec![vec![1,2,3], vec![4,5,6], vec![7,8,9]];\nlet (n, m) = (a.len(), a[0].len());\nlet mut dp = vec![vec![0; m]; n];\ndp[0][0] = a[0][0];\nfor i in 0..n {\n    for j in 0..m {\n        if i > 0 { dp[i][j] = dp[i][j].max(dp[i - 1][j] + a[i][j]); }\n        if j > 0 { dp[i][j] = dp[i][j].max(dp[i][j - 1] + a[i][j]); }\n    }\n}\nprintln!("{}", dp[n - 1][m - 1]);`
  },
  intervals: {
    python: `segments = [(1, 4), (3, 8), (10, 12)]\nsegments.sort()\nmerged = []\nfor l, r in segments:\n    if not merged or l > merged[-1][1]:\n        merged.append([l, r])\n    else:\n        merged[-1][1] = max(merged[-1][1], r)\nprint(merged)`,
    java: `List<int[]> a = new ArrayList<>(List.of(new int[]{1,4}, new int[]{3,8}, new int[]{10,12}));\na.sort(Comparator.comparingInt(x -> x[0]));\nList<int[]> merged = new ArrayList<>();\nfor (int[] seg : a) {\n  if (merged.isEmpty() || seg[0] > merged.get(merged.size() - 1)[1]) merged.add(seg.clone());\n  else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], seg[1]);\n}`,
    cpp: `std::vector<std::pair<int,int>> a{{1,4}, {3,8}, {10,12}};\nsort(a.begin(), a.end());\nstd::vector<std::pair<int,int>> merged;\nfor (auto [l, r] : a) {\n  if (merged.empty() || l > merged.back().second) merged.push_back({l, r});\n  else merged.back().second = std::max(merged.back().second, r);\n}`,
    rust: `let mut a = vec![(1, 4), (3, 8), (10, 12)];\na.sort();\nlet mut merged: Vec<(i32, i32)> = Vec::new();\nfor (l, r) in a {\n    if merged.last().is_none() || l > merged.last().unwrap().1 {\n        merged.push((l, r));\n    } else if let Some(last) = merged.last_mut() {\n        last.1 = last.1.max(r);\n    }\n}`
  },
  optimization: {
    python: `best = 10**18\ncur = 0\nfor x in [5, 2, 7, 1, 3]:\n    cur += x\n    best = min(best, cur)\nprint(best)`,
    java: `long best = Long.MAX_VALUE, cur = 0;\nfor (int x : new int[]{5, 2, 7, 1, 3}) {\n  cur += x;\n  best = Math.min(best, cur);\n}\nSystem.out.println(best);`,
    cpp: `long long best = LLONG_MAX, cur = 0;\nfor (int x : {5, 2, 7, 1, 3}) {\n  cur += x;\n  best = std::min(best, cur);\n}\nstd::cout << best;`,
    rust: `let (mut best, mut cur) = (i64::MAX, 0i64);\nfor x in [5, 2, 7, 1, 3] {\n    cur += x;\n    best = best.min(cur);\n}\nprintln!("{}", best);`
  }
};

const tasks = [
  { number: 1, title: "Системы счисления и перевод чисел", type: "theory", summary: "Быстрый перевод между двоичной, восьмеричной и шестнадцатеричной записью.", points: ["Считай через группы бит", "Проверяй ведущие нули", "Удобно использовать встроенные функции"] },
  { number: 2, title: "Таблицы истинности", type: "logic", summary: "Полный перебор переменных и аккуратная проверка формулы.", points: ["Генерируй все 0/1", "Сначала скобки, потом отрицания", "Сравнивай строки таблицы"] },
  { number: 3, title: "Информационные модели и таблицы", type: "theory", summary: "Чтение схем, таблиц и сопоставление полей по ограничениям.", points: ["Ищи инварианты", "Отсекай невозможные пары", "Сначала фиксируй уникальные значения"] },
  { number: 4, title: "Кодирование информации", type: "theory", summary: "Биты, байты, мощность алфавита и минимальная длина кодов.", points: ["Используй log2", "Разделяй код символа и объем файла", "Проверяй единицы измерения"] },
  { number: 5, title: "Преобразование числа по алгоритму", type: "loops", summary: "Перебор исходных чисел и построение нового двоичного представления.", points: ["Начинай с малого диапазона", "Строй строку аккуратно", "Проверяй условие на результат"] },
  { number: 6, title: "Исполнитель Черепаха или Робот", type: "theory", summary: "Траектория, геометрия, площадь и понимание команд исполнителя.", points: ["Рисуй схему", "Следи за направлением", "Для площади полезна формула многоугольника"] },
  { number: 7, title: "Изображения, звук, передача данных", type: "theory", summary: "Размер файла, частота дискретизации, глубина цвета и скорость передачи.", points: ["Приводи все к битам", "Учитывай каналы цвета", "Не забывай про секунды и минуты"] },
  { number: 8, title: "Комбинаторика слов и кодов", type: "combinatorics", summary: "Перебор слов, ограничений по символам и подсчет вариантов.", points: ["Полезен product", "Сразу фильтруй по условию", "Проверяй повторения и запреты"] },
  { number: 9, title: "Электронные таблицы", type: "files", summary: "Обработка строк таблицы, агрегаты, фильтры и сравнение значений.", points: ["Читай данные построчно", "Часто нужна сумма или максимум", "Сохраняй только нужные поля"] },
  { number: 10, title: "Текстовый поиск и анализ", type: "strings", summary: "Подсчет слов, символов, шаблонов и длины фрагментов текста.", points: ["Работай со строками", "Важны split, count, replace", "Следи за регистром и пробелами"] },
  { number: 11, title: "Кодирование и хранение данных", type: "theory", summary: "Объем памяти, количество пользователей и идентификаторов.", points: ["Находи бит на один объект", "Округляй вверх", "Сначала мощность множества, потом объем"] },
  { number: 12, title: "Редактор строк", type: "editor", summary: "Замены по шаблону до стабилизации строки.", points: ["Меняй только первое вхождение", "Держи цикл while", "Проверяй порядок замен"] },
  { number: 13, title: "Графы и маршруты", type: "graph", summary: "Пути, длины, кратчайшие переходы и чтение графической схемы.", points: ["Для кратчайшего пути BFS", "Для таблицы расстояний выписывай вручную", "Следи за ориентированностью"] },
  { number: 14, title: "Системы счисления и выражения", type: "theory", summary: "Арифметика в разных основаниях и подсчет цифр в записи.", points: ["Сначала посчитай значение", "Потом переводи основание", "Ищи количество нужной цифры"] },
  { number: 15, title: "Логические выражения и отрезки", type: "logic", summary: "Подбор наименьшего A, при котором формула истинна для всех x.", points: ["Перебирай A", "Внутри перебирай x", "Для отрезков удобно работать с принадлежностью"] },
  { number: 16, title: "Рекурсивные функции", type: "recursion", summary: "Определи значение функции по рекуррентной формуле.", points: ["Начинай с базы", "Следи за ветвлением", "Иногда лучше memoization"] },
  { number: 17, title: "Анализ чисел из файла", type: "files", summary: "Пары, тройки, условия на делимость, максимум и количество.", points: ["Сначала прочитай весь файл", "Часто нужен максимум по особому признаку", "Окно 2 или 3 элемента"] },
  { number: 18, title: "Робот на клетчатом поле", type: "robot", summary: "Максимум или минимум суммы на пути по таблице.", points: ["ДП по клеткам", "Переходы сверху и слева", "Отдельно учитывай стартовую клетку"] },
  { number: 19, title: "Игры на двух игроков", type: "games", summary: "Выигрышные и проигрышные позиции при оптимальной игре.", points: ["Определи конечную позицию", "Ход выигрышный, если ведет в проигрыш", "Дальше строй уровни P1, V1, P2"] },
  { number: 20, title: "Игры: стратегия второго вопроса", type: "games", summary: "Поиск позиции, где есть выигрыш вторым ходом после ошибки соперника.", points: ["Используй ту же рекурсию", "Отмечай глубину победы", "Разделяй сильные и слабые позиции"] },
  { number: 21, title: "Игры: гарантированная победа", type: "games", summary: "Поиск стартовых значений с гарантированной стратегией к нужному ходу.", points: ["Смотри на все ответы соперника", "Применяй any и all", "Не путай минимум и максимум по ходам"] },
  { number: 22, title: "Процессы и зависимости", type: "graph", summary: "Вычисление времени завершения по зависимостям работ.", points: ["Это DAG", "Время вершины = свое + максимум предков", "Удобен DFS или топсорт"] },
  { number: 23, title: "Калькулятор и количество программ", type: "dp", summary: "Сколько способов дойти от числа A до B по заданным командам.", points: ["ДП или рекурсия", "Запрещенные вершины зануляй", "Для маршрута через точку перемножай участки"] },
  { number: 24, title: "Строки и последовательности", type: "strings", summary: "Длиннейшие фрагменты, шаблоны и скользящие окна.", points: ["Следи за текущим отрезком", "Используй два указателя", "Храни индексы последних вхождений"] },
  { number: 25, title: "Делители, маски и поиск чисел", type: "masks", summary: "Перебор кандидатов по маске и проверка арифметического свойства.", points: ["Ограничь диапазон", "Проверяй делимость и делители", "Форматируй ответ строго как в условии"] },
  { number: 26, title: "Жадные алгоритмы и интервалы", type: "intervals", summary: "Сортировка, выбор оптимальных объектов и учет ограничений.", points: ["Сортируй по ключу из условия", "Думай о локально лучшем выборе", "Проверяй крайние случаи"] },
  { number: 27, title: "Оптимизация на больших данных", type: "optimization", summary: "Максимум или минимум с линейным проходом, префиксами и остатками.", points: ["Нельзя полный перебор", "Храни лучший префикс", "Ищи инвариант для O(n)"] }
];

const languages = [
  { key: "python", label: "Python" },
  { key: "java", label: "Java" },
  { key: "cpp", label: "C++" },
  { key: "rust", label: "Rust" }
];

const typeLabels = {
  theory: "Теория и вычисления",
  logic: "Логика",
  editor: "Редактор",
  loops: "Перебор",
  masks: "Маски и делители",
  files: "Файлы и таблицы",
  strings: "Строки",
  combinatorics: "Комбинаторика",
  recursion: "Рекурсия",
  graph: "Графы",
  games: "Игры",
  dp: "ДП",
  robot: "Робот",
  intervals: "Жадность и интервалы",
  optimization: "Большие данные"
};

const state = {
  language: "python",
  query: ""
};

const languageFilters = document.getElementById("language-filters");
const quickNav = document.getElementById("quick-nav");
const typeTags = document.getElementById("type-tags");
const taskGrid = document.getElementById("task-grid");
const taskTemplate = document.getElementById("task-card-template");
const tasksCounter = document.getElementById("tasks-counter");
const searchInput = document.getElementById("task-search");

function createLanguageFilters() {
  languages.forEach((language) => {
    const button = document.createElement("button");
    button.className = `chip${language.key === state.language ? " is-active" : ""}`;
    button.textContent = language.label;
    button.addEventListener("click", () => {
      state.language = language.key;
      render();
    });
    languageFilters.appendChild(button);
  });
}

function createQuickNav() {
  tasks.forEach((task) => {
    const link = document.createElement("a");
    link.href = `#task-${task.number}`;
    link.textContent = task.number;
    quickNav.appendChild(link);
  });
}

function createTypeTags() {
  [...new Set(tasks.map((task) => task.type))].forEach((type) => {
    const item = document.createElement("span");
    item.textContent = typeLabels[type];
    typeTags.appendChild(item);
  });
}

function matchesQuery(task) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    task.number,
    task.title,
    task.summary,
    typeLabels[task.type],
    ...task.points
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function createTab(language) {
  const button = document.createElement("button");
  button.className = `task-tab${language.key === state.language ? " is-active" : ""}`;
  button.textContent = language.label;
  button.addEventListener("click", () => {
    state.language = language.key;
    render();
  });
  return button;
}

function renderTasks() {
  taskGrid.innerHTML = "";
  const visibleTasks = tasks.filter(matchesQuery);
  tasksCounter.textContent = `Показано: ${visibleTasks.length} из ${tasks.length}`;

  visibleTasks.forEach((task) => {
    const fragment = taskTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".task-card");
    article.id = `task-${task.number}`;

    fragment.querySelector(".task-number").textContent = `Задание ${task.number}`;
    fragment.querySelector(".task-title").textContent = task.title;
    fragment.querySelector(".task-type").textContent = typeLabels[task.type];
    fragment.querySelector(".task-summary").textContent = task.summary;

    const points = fragment.querySelector(".task-points");
    task.points.forEach((point) => {
      const badge = document.createElement("span");
      badge.textContent = point;
      points.appendChild(badge);
    });

    const tabs = fragment.querySelector(".task-tabs");
    languages.forEach((language) => tabs.appendChild(createTab(language)));
    fragment.querySelector("code").textContent = snippets[task.type][state.language];

    taskGrid.appendChild(fragment);
  });
}

function renderLanguageFilters() {
  [...languageFilters.children].forEach((button, index) => {
    button.classList.toggle("is-active", languages[index].key === state.language);
  });
}

function render() {
  renderLanguageFilters();
  renderTasks();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderTasks();
});

createLanguageFilters();
createQuickNav();
createTypeTags();
render();
