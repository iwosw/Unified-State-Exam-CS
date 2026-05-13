const codeTemplates = {
  infoModel: {
    python: `from itertools import permutations

objects = ["A", "B", "C", "D"]
for p in permutations(objects):
    # Подставь реальные ограничения из таблицы или схемы.
    if p[0] != "A" and p.index("B") < p.index("C"):
        print(p)`,
    java: `String[] a = {"A", "B", "C", "D"};
permute(0, a);

static void permute(int pos, String[] a) {
  if (pos == a.length) {
    List<String> p = Arrays.asList(a);
    if (!p.get(0).equals("A") && p.indexOf("B") < p.indexOf("C")) {
      System.out.println(p);
    }
    return;
  }
  for (int i = pos; i < a.length; i++) {
    String t = a[pos];
    a[pos] = a[i];
    a[i] = t;
    permute(pos + 1, a);
    t = a[pos];
    a[pos] = a[i];
    a[i] = t;
  }
}`,
    cpp: `vector<string> a = {"A", "B", "C", "D"};
sort(a.begin(), a.end());
do {
  if (a[0] != "A") {
    int b = find(a.begin(), a.end(), "B") - a.begin();
    int c = find(a.begin(), a.end(), "C") - a.begin();
    if (b < c) {
      for (auto &x : a) cout << x << ' ';
      cout << '\n';
    }
  }
} while (next_permutation(a.begin(), a.end()));`,
    rust: `fn dfs(pos: usize, a: &mut Vec<&str>) {
    if pos == a.len() {
        let b = a.iter().position(|&x| x == "B").unwrap();
        let c = a.iter().position(|&x| x == "C").unwrap();
        if a[0] != "A" && b < c {
            println!("{:?}", a);
        }
        return;
    }
    for i in pos..a.len() {
        a.swap(pos, i);
        dfs(pos + 1, a);
        a.swap(pos, i);
    }
}

let mut a = vec!["A", "B", "C", "D"];
dfs(0, &mut a);`
  },
  truthTable: {
    python: `from itertools import product

for x, y, z, w in product([0, 1], repeat=4):
    f = ((x and not y) or z) <= w
    print(x, y, z, w, int(f))`,
    java: `for (int x = 0; x <= 1; x++)
  for (int y = 0; y <= 1; y++)
    for (int z = 0; z <= 1; z++)
      for (int w = 0; w <= 1; w++) {
        boolean f = (!(x == 1 && y == 0) || z == 1) ? w == 1 : true;
        System.out.println(x + " " + y + " " + z + " " + w + " " + (f ? 1 : 0));
      }`,
    cpp: `for (int x = 0; x <= 1; ++x)
  for (int y = 0; y <= 1; ++y)
    for (int z = 0; z <= 1; ++z)
      for (int w = 0; w <= 1; ++w) {
        bool f = (!(x && !y) || z) <= w;
        cout << x << ' ' << y << ' ' << z << ' ' << w << ' ' << f << '\n';
      }`,
    rust: `for x in 0..=1 {
    for y in 0..=1 {
        for z in 0..=1 {
            for w in 0..=1 {
                let f = ((!((x == 1) && (y == 0))) || z == 1) <= (w == 1);
                println!("{} {} {} {} {}", x, y, z, w, f as i32);
            }
        }
    }
}`
  },
  database: {
    python: `import csv

best = 0
with open("3.csv", encoding="utf-8") as f:
    rows = csv.DictReader(f, delimiter=';')
    for row in rows:
        if row["Город"] == "Москва" and int(row["Баллы"]) >= 80:
            best += int(row["Количество"])
print(best)`,
    java: `int ans = 0;
for (String line : Files.readAllLines(Path.of("3.csv"))) {
  String[] p = line.split(";");
  if (p[1].equals("Москва") && Integer.parseInt(p[3]) >= 80) {
    ans += Integer.parseInt(p[2]);
  }
}
System.out.println(ans);`,
    cpp: `ifstream in("3.csv");
string line;
getline(in, line); // заголовок
int ans = 0;
while (getline(in, line)) {
  stringstream ss(line);
  vector<string> p;
  for (string x; getline(ss, x, ';'); ) p.push_back(x);
  if (p[1] == "Москва" && stoi(p[3]) >= 80) ans += stoi(p[2]);
}
cout << ans;`,
    rust: `let text = std::fs::read_to_string("3.csv").unwrap();
let mut ans = 0;
for line in text.lines().skip(1) {
    let p: Vec<&str> = line.split(';').collect();
    if p[1] == "Москва" && p[3].parse::<i32>().unwrap() >= 80 {
        ans += p[2].parse::<i32>().unwrap();
    }
}
println!("{}", ans);`
  },
  coding: {
    python: `from math import ceil, log2

alphabet = 26
symbols = 1200
bits_per_symbol = ceil(log2(alphabet))
total_bits = bits_per_symbol * symbols
print(bits_per_symbol, total_bits, total_bits / 8)`,
    java: `int alphabet = 26, symbols = 1200;
int bitsPerSymbol = (int) Math.ceil(Math.log(alphabet) / Math.log(2));
int totalBits = bitsPerSymbol * symbols;
System.out.println(bitsPerSymbol + " " + totalBits + " " + totalBits / 8.0);`,
    cpp: `int alphabet = 26, symbols = 1200;
int bitsPerSymbol = (int) ceil(log2(alphabet));
int totalBits = bitsPerSymbol * symbols;
cout << bitsPerSymbol << ' ' << totalBits << ' ' << totalBits / 8.0;`,
    rust: `let alphabet = 26f64;
let symbols = 1200f64;
let bits_per_symbol = alphabet.log2().ceil();
let total_bits = bits_per_symbol * symbols;
println!("{} {} {}", bits_per_symbol, total_bits, total_bits / 8.0);`
  },
  binaryAlgo: {
    python: `ans = []
for n in range(1, 1000):
    r = bin(n)[2:]
    r += r[-1]
    if int(r, 2) > 130:
        ans.append(n)
print(min(ans))`,
    java: `int best = Integer.MAX_VALUE;
for (int n = 1; n < 1000; n++) {
  String r = Integer.toBinaryString(n);
  r += r.charAt(r.length() - 1);
  if (Integer.parseInt(r, 2) > 130) best = Math.min(best, n);
}
System.out.println(best);`,
    cpp: `int best = INT_MAX;
for (int n = 1; n < 1000; ++n) {
  string r = bitset<16>(n).to_string();
  r = r.substr(r.find('1'));
  r += r.back();
  if (stoi(r, nullptr, 2) > 130) best = min(best, n);
}
cout << best;`,
    rust: `let mut best = i32::MAX;
for n in 1..1000 {
    let mut r = format!("{:b}", n);
    let last = r.chars().last().unwrap();
    r.push(last);
    if i32::from_str_radix(&r, 2).unwrap() > 130 {
        best = best.min(n);
    }
}
println!("{}", best);`
  },
  executorLoops: {
    python: `x = y = 0
dx, dy = 1, 0
for cmd, val in [("F", 12), ("R", 90), ("F", 5)]:
    if cmd == "R":
        for _ in range(val // 90):
            dx, dy = dy, -dx
    else:
        x += dx * val
        y += dy * val
print(x, y)`,
    java: `int x = 0, y = 0, dx = 1, dy = 0;
for (String cmd : List.of("F 12", "R 90", "F 5")) {
  String[] p = cmd.split(" ");
  int val = Integer.parseInt(p[1]);
  if (p[0].equals("R")) {
    for (int i = 0; i < val / 90; i++) {
      int ndx = dy, ndy = -dx;
      dx = ndx; dy = ndy;
    }
  } else {
    x += dx * val;
    y += dy * val;
  }
}
System.out.println(x + " " + y);`,
    cpp: `int x = 0, y = 0, dx = 1, dy = 0;
vector<pair<char,int>> a{{'F',12}, {'R',90}, {'F',5}};
for (auto [cmd, val] : a) {
  if (cmd == 'R') {
    for (int i = 0; i < val / 90; ++i) {
      int ndx = dy, ndy = -dx;
      dx = ndx; dy = ndy;
    }
  } else {
    x += dx * val;
    y += dy * val;
  }
}
cout << x << ' ' << y;`,
    rust: `let (mut x, mut y, mut dx, mut dy) = (0, 0, 1, 0);
for (cmd, val) in [('F', 12), ('R', 90), ('F', 5)] {
    if cmd == 'R' {
        for _ in 0..val / 90 {
            let (ndx, ndy) = (dy, -dx);
            dx = ndx;
            dy = ndy;
        }
    } else {
        x += dx * val;
        y += dy * val;
    }
}
println!("{} {}", x, y);`
  },
  media: {
    python: `width, height, depth = 1920, 1080, 24
speed = 16_000_000
bits = width * height * depth
seconds = bits / speed
print(bits, seconds)`,
    java: `long width = 1920, height = 1080, depth = 24, speed = 16_000_000;
long bits = width * height * depth;
double seconds = (double) bits / speed;
System.out.println(bits + " " + seconds);`,
    cpp: `long long width = 1920, height = 1080, depth = 24, speed = 16000000;
long long bits = width * height * depth;
cout << bits << ' ' << 1.0 * bits / speed;`,
    rust: `let (width, height, depth, speed) = (1920_i64, 1080_i64, 24_i64, 16_000_000_i64);
let bits = width * height * depth;
println!("{} {}", bits, bits as f64 / speed as f64);`
  },
  combinatorics: {
    python: `from itertools import product

count = 0
for w in product("ABCX", repeat=5):
    s = "".join(w)
    if s.count("X") == 1:
        count += 1
print(count)`,
    java: `char[] a = {'A', 'B', 'C', 'X'};
int count = 0;
for (char c1 : a) for (char c2 : a) for (char c3 : a)
for (char c4 : a) for (char c5 : a) {
  String s = "" + c1 + c2 + c3 + c4 + c5;
  if (s.chars().filter(ch -> ch == 'X').count() == 1) count++;
}
System.out.println(count);`,
    cpp: `string a = "ABCX";
int count = 0;
for (char c1 : a) for (char c2 : a) for (char c3 : a)
for (char c4 : a) for (char c5 : a) {
  string s = {c1, c2, c3, c4, c5};
  count += count_if(s.begin(), s.end(), [](char ch){ return ch == 'X'; }) == 1;
}
cout << count;`,
    rust: `let a = ['A', 'B', 'C', 'X'];
let mut count = 0;
for &c1 in &a { for &c2 in &a { for &c3 in &a {
for &c4 in &a { for &c5 in &a {
    let s = [c1, c2, c3, c4, c5];
    if s.iter().filter(|&&ch| ch == 'X').count() == 1 { count += 1; }
}}}}}
println!("{}", count);`
  },
  spreadsheet: {
    python: `import csv

ans = 0
with open("9.csv", encoding="utf-8") as f:
    rows = csv.reader(f, delimiter=';')
    for row in rows:
        nums = list(map(int, row))
        if sum(nums[:3]) > nums[3]:
            ans += 1
print(ans)`,
    java: `int ans = 0;
for (String line : Files.readAllLines(Path.of("9.csv"))) {
  int[] a = Arrays.stream(line.split(";"))
      .mapToInt(Integer::parseInt)
      .toArray();
  if (a[0] + a[1] + a[2] > a[3]) ans++;
}
System.out.println(ans);`,
    cpp: `ifstream in("9.csv");
string line;
int ans = 0;
while (getline(in, line)) {
  stringstream ss(line);
  vector<int> a;
  for (string x; getline(ss, x, ';'); ) a.push_back(stoi(x));
  if (a[0] + a[1] + a[2] > a[3]) ans++;
}
cout << ans;`,
    rust: `let text = std::fs::read_to_string("9.csv").unwrap();
let mut ans = 0;
for line in text.lines() {
    let a: Vec<i32> = line.split(';').map(|x| x.parse().unwrap()).collect();
    if a[0] + a[1] + a[2] > a[3] { ans += 1; }
}
println!("{}", ans);`
  },
  textSearch: {
    python: `import re

text = open("10.txt", encoding="utf-8").read().lower()
print(len(re.findall(r"\\bинформатика\\b", text)))`,
    java: `String text = Files.readString(Path.of("10.txt")).toLowerCase();
Matcher m = Pattern.compile("\\\\bинформатика\\\\b").matcher(text);
int count = 0;
while (m.find()) count++;
System.out.println(count);`,
    cpp: `ifstream in("10.txt");
string text((istreambuf_iterator<char>(in)), istreambuf_iterator<char>());
regex rgx("\\binformatika\\b");
cout << distance(sregex_iterator(text.begin(), text.end(), rgx), sregex_iterator());`,
    rust: `let text = std::fs::read_to_string("10.txt").unwrap().to_lowercase();
let count = text.split_whitespace().filter(|&w| w == "информатика").count();
println!("{}", count);`
  },
  infoAmount: {
    python: `from math import ceil, log2

users = 5000
bits_for_id = ceil(log2(users))
bytes_for_id = ceil(bits_for_id / 8)
print(bits_for_id, bytes_for_id)`,
    java: `int users = 5000;
int bits = (int) Math.ceil(Math.log(users) / Math.log(2));
int bytes = (bits + 7) / 8;
System.out.println(bits + " " + bytes);`,
    cpp: `int users = 5000;
int bits = (int) ceil(log2(users));
int bytes = (bits + 7) / 8;
cout << bits << ' ' << bytes;`,
    rust: `let users = 5000f64;
let bits = users.log2().ceil() as i32;
let bytes = (bits + 7) / 8;
println!("{} {}", bits, bytes);`
  },
  editor: {
    python: `s = "1" * 80
while "111" in s or "222" in s:
    s = s.replace("111", "2", 1)
    s = s.replace("222", "1", 1)
print(s)`,
    java: `String s = "1".repeat(80);
while (s.contains("111") || s.contains("222")) {
  s = s.replaceFirst("111", "2");
  s = s.replaceFirst("222", "1");
}
System.out.println(s);`,
    cpp: `string s(80, '1');
while (s.find("111") != string::npos || s.find("222") != string::npos) {
  if (auto p = s.find("111"); p != string::npos) s.replace(p, 3, "2");
  if (auto p = s.find("222"); p != string::npos) s.replace(p, 3, "1");
}
cout << s;`,
    rust: `let mut s = "1".repeat(80);
while s.contains("111") || s.contains("222") {
    s = s.replacen("111", "2", 1);
    s = s.replacen("222", "1", 1);
}
println!("{}", s);`
  },
  ipMask: {
    python: `from ipaddress import IPv4Network

ip = "192.168.32.160"
mask = "255.255.255.240"
net = IPv4Network(f"{ip}/{mask}", strict=False)
print(net.network_address)
print(net.num_addresses)
print(bin(int(net.netmask)).count("1"))`,
    java: `int ip = parseIp("192.168.32.160");
int mask = parseIp("255.255.255.240");
int net = ip & mask;
System.out.println(toIp(net));
System.out.println(Integer.bitCount(mask));

static int parseIp(String s) {
  int x = 0;
  for (String part : s.split("\\\\.")) x = (x << 8) | Integer.parseInt(part);
  return x;
}`,
    cpp: `auto parse = [](string s) {
  stringstream ss(s);
  int x = 0;
  for (string p; getline(ss, p, '.'); ) x = (x << 8) | stoi(p);
  return x;
};
int ip = parse("192.168.32.160");
int mask = parse("255.255.255.240");
int net = ip & mask;
cout << ((net >> 24) & 255) << '.' << ((net >> 16) & 255) << '.'
     << ((net >> 8) & 255) << '.' << (net & 255) << '\n';
cout << __builtin_popcount(mask);`,
    rust: `fn parse_ip(s: &str) -> u32 {
    s.split('.')
        .map(|x| x.parse::<u32>().unwrap())
        .fold(0, |acc, x| (acc << 8) | x)
}

let ip = parse_ip("192.168.32.160");
let mask = parse_ip("255.255.255.240");
let net = ip & mask;
println!("{}.{}.{}.{}", (net >> 24) & 255, (net >> 16) & 255, (net >> 8) & 255, net & 255);
println!("{}", mask.count_ones());`
  },
  numeralSystems: {
    python: `n = 9**7 + 3**10 - 5
digits = []
while n:
    digits.append(n % 3)
    n //= 3
print(digits.count(2))`,
    java: `long n = (long) Math.pow(9, 7) + (long) Math.pow(3, 10) - 5;
int count = 0;
while (n > 0) {
  if (n % 3 == 2) count++;
  n /= 3;
}
System.out.println(count);`,
    cpp: `long long n = (long long) pow(9, 7) + (long long) pow(3, 10) - 5;
int count = 0;
while (n > 0) {
  count += n % 3 == 2;
  n /= 3;
}
cout << count;`,
    rust: `let mut n = 9_i64.pow(7) + 3_i64.pow(10) - 5;
let mut count = 0;
while n > 0 {
    if n % 3 == 2 { count += 1; }
    n /= 3;
}
println!("{}", count);`
  },
  logicA: {
    python: `def inside(x, l, r):
    return l <= x <= r

for A in range(0, 200):
    ok = True
    for x in range(0, 200):
        f = (not inside(x, 10, 20)) or inside(x, 30, 40) or inside(x, A, A + 15)
        if not f:
            ok = False
            break
    if ok:
        print(A)
        break`,
    java: `for (int A = 0; A < 200; A++) {
  boolean ok = true;
  for (int x = 0; x < 200; x++) {
    boolean f = !(10 <= x && x <= 20) || (30 <= x && x <= 40) || (A <= x && x <= A + 15);
    if (!f) { ok = false; break; }
  }
  if (ok) { System.out.println(A); break; }
}`,
    cpp: `for (int A = 0; A < 200; ++A) {
  bool ok = true;
  for (int x = 0; x < 200; ++x) {
    bool f = !(10 <= x && x <= 20) || (30 <= x && x <= 40) || (A <= x && x <= A + 15);
    if (!f) { ok = false; break; }
  }
  if (ok) { cout << A; break; }
}`,
    rust: `for a in 0..200 {
    let mut ok = true;
    for x in 0..200 {
        let f = !(10 <= x && x <= 20) || (30 <= x && x <= 40) || (a <= x && x <= a + 15);
        if !f { ok = false; break; }
    }
    if ok {
        println!("{}", a);
        break;
    }
}`
  },
  recursion: {
    python: `from functools import lru_cache

@lru_cache(None)
def f(n):
    if n <= 2:
        return 1
    return f(n - 1) + f(n - 2)

print(f(35))`,
    java: `static Map<Integer, Long> memo = new HashMap<>();

static long f(int n) {
  if (n <= 2) return 1;
  if (memo.containsKey(n)) return memo.get(n);
  long ans = f(n - 1) + f(n - 2);
  memo.put(n, ans);
  return ans;
}`,
    cpp: `map<int, long long> memo;
long long f(int n) {
  if (n <= 2) return 1;
  if (memo.count(n)) return memo[n];
  return memo[n] = f(n - 1) + f(n - 2);
}`,
    rust: `fn f(n: i32, memo: &mut std::collections::HashMap<i32, i64>) -> i64 {
    if n <= 2 { return 1; }
    if let Some(&v) = memo.get(&n) { return v; }
    let ans = f(n - 1, memo) + f(n - 2, memo);
    memo.insert(n, ans);
    ans
}`
  },
  sequence17: {
    python: `with open("17.txt") as f:
    a = [int(x) for x in f]

count = 0
best = -10**18
for i in range(len(a) - 1):
    s = a[i] + a[i + 1]
    if s % 2 == 0:
        count += 1
        best = max(best, s)
print(count, best)`,
    java: `List<Integer> a = Files.lines(Path.of("17.txt")).map(Integer::parseInt).toList();
int count = 0, best = Integer.MIN_VALUE;
for (int i = 0; i < a.size() - 1; i++) {
  int s = a.get(i) + a.get(i + 1);
  if (s % 2 == 0) { count++; best = Math.max(best, s); }
}
System.out.println(count + " " + best);`,
    cpp: `ifstream in("17.txt");
vector<int> a;
for (int x; in >> x; ) a.push_back(x);
int count = 0, best = INT_MIN;
for (size_t i = 0; i + 1 < a.size(); ++i) {
  int s = a[i] + a[i + 1];
  if (s % 2 == 0) { ++count; best = max(best, s); }
}
cout << count << ' ' << best;`,
    rust: `let text = std::fs::read_to_string("17.txt").unwrap();
let a: Vec<i32> = text.lines().map(|s| s.parse().unwrap()).collect();
let (mut count, mut best) = (0, i32::MIN);
for i in 0..a.len() - 1 {
    let s = a[i] + a[i + 1];
    if s % 2 == 0 { count += 1; best = best.max(s); }
}
println!("{} {}", count, best);`
  },
  dynamic18: {
    python: `grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
n, m = len(grid), len(grid[0])
dp = [[-10**18] * m for _ in range(n)]
dp[0][0] = grid[0][0]
for i in range(n):
    for j in range(m):
        if i:
            dp[i][j] = max(dp[i][j], dp[i - 1][j] + grid[i][j])
        if j:
            dp[i][j] = max(dp[i][j], dp[i][j - 1] + grid[i][j])
print(dp[-1][-1])`,
    java: `int[][] a = {{1,2,3},{4,5,6},{7,8,9}};
int n = a.length, m = a[0].length;
int[][] dp = new int[n][m];
for (int[] row : dp) Arrays.fill(row, Integer.MIN_VALUE / 2);
dp[0][0] = a[0][0];
for (int i = 0; i < n; i++)
  for (int j = 0; j < m; j++) {
    if (i > 0) dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + a[i][j]);
    if (j > 0) dp[i][j] = Math.max(dp[i][j], dp[i][j - 1] + a[i][j]);
  }
System.out.println(dp[n - 1][m - 1]);`,
    cpp: `vector<vector<int>> a{{1,2,3},{4,5,6},{7,8,9}};
int n = a.size(), m = a[0].size();
vector<vector<int>> dp(n, vector<int>(m, -1e9));
dp[0][0] = a[0][0];
for (int i = 0; i < n; ++i)
  for (int j = 0; j < m; ++j) {
    if (i) dp[i][j] = max(dp[i][j], dp[i - 1][j] + a[i][j]);
    if (j) dp[i][j] = max(dp[i][j], dp[i][j - 1] + a[i][j]);
  }
cout << dp[n - 1][m - 1];`,
    rust: `let a = vec![vec![1,2,3], vec![4,5,6], vec![7,8,9]];
let (n, m) = (a.len(), a[0].len());
let mut dp = vec![vec![-1_000_000_000; m]; n];
dp[0][0] = a[0][0];
for i in 0..n {
    for j in 0..m {
        if i > 0 { dp[i][j] = dp[i][j].max(dp[i - 1][j] + a[i][j]); }
        if j > 0 { dp[i][j] = dp[i][j].max(dp[i][j - 1] + a[i][j]); }
    }
}
println!("{}", dp[n - 1][m - 1]);`
  },
  games: {
    python: `from functools import lru_cache

@lru_cache(None)
def f(x):
    if x >= 43:
        return 0
    moves = [x + 1, x * 2]
    if any(f(y) == 0 for y in moves):
        return 1
    if all(f(y) == 1 for y in moves):
        return 2
    if any(f(y) == 2 for y in moves):
        return 3
    if all(f(y) in (1, 3) for y in moves):
        return 4

for s in range(1, 43):
    print(s, f(s))`,
    java: `static int[] memo = new int[1000];

static int f(int x) {
  if (x >= 43) return 0;
  if (memo[x] != 0) return memo[x];
  int[] moves = {x + 1, x * 2};
  if (Arrays.stream(moves).anyMatch(y -> f(y) == 0)) return memo[x] = 1;
  if (Arrays.stream(moves).allMatch(y -> f(y) == 1)) return memo[x] = 2;
  if (Arrays.stream(moves).anyMatch(y -> f(y) == 2)) return memo[x] = 3;
  return memo[x] = 4;
}`,
    cpp: `vector<int> memo(1000, -1);
int f(int x) {
  if (x >= 43) return 0;
  if (memo[x] != -1) return memo[x];
  vector<int> moves = {x + 1, x * 2};
  for (int y : moves) if (f(y) == 0) return memo[x] = 1;
  bool all1 = true;
  for (int y : moves) all1 &= f(y) == 1;
  if (all1) return memo[x] = 2;
  for (int y : moves) if (f(y) == 2) return memo[x] = 3;
  return memo[x] = 4;
}`,
    rust: `fn f(x: i32, memo: &mut Vec<i32>) -> i32 {
    if x >= 43 { return 0; }
    if memo[x as usize] != -1 { return memo[x as usize]; }
    let moves = [x + 1, x * 2];
    if moves.iter().any(|&y| f(y, memo) == 0) { memo[x as usize] = 1; return 1; }
    if moves.iter().all(|&y| f(y, memo) == 1) { memo[x as usize] = 2; return 2; }
    if moves.iter().any(|&y| f(y, memo) == 2) { memo[x as usize] = 3; return 3; }
    memo[x as usize] = 4;
    4
}`
  },
  processes22: {
    python: `from functools import lru_cache

time = {"A": 3, "B": 5, "C": 2, "D": 7}
parents = {"A": [], "B": ["A"], "C": ["A"], "D": ["B", "C"]}

@lru_cache(None)
def finish(v):
    if not parents[v]:
        return time[v]
    return time[v] + max(finish(p) for p in parents[v])

print(max(finish(v) for v in time))`,
    java: `Map<String, Integer> time = Map.of("A", 3, "B", 5, "C", 2, "D", 7);
Map<String, List<String>> parents = Map.of(
  "A", List.of(),
  "B", List.of("A"),
  "C", List.of("A"),
  "D", List.of("B", "C")
);
Map<String, Integer> memo = new HashMap<>();

int finish(String v) {
  if (memo.containsKey(v)) return memo.get(v);
  int best = parents.get(v).isEmpty() ? 0 : parents.get(v).stream().mapToInt(p -> finish(p)).max().orElse(0);
  int ans = time.get(v) + best;
  memo.put(v, ans);
  return ans;
}`,
    cpp: `map<string, int> time{{"A",3},{"B",5},{"C",2},{"D",7}};
map<string, vector<string>> parents{{"A",{}},{"B",{"A"}},{"C",{"A"}},{"D",{"B","C"}}};
map<string, int> memo;

int finish(const string& v) {
  if (memo.count(v)) return memo[v];
  int best = 0;
  for (auto &p : parents[v]) best = max(best, finish(p));
  return memo[v] = time[v] + best;
}`,
    rust: `use std::collections::HashMap;

fn finish(v: &str, time: &HashMap<&str, i32>, parents: &HashMap<&str, Vec<&str>>, memo: &mut HashMap<String, i32>) -> i32 {
    if let Some(&ans) = memo.get(v) { return ans; }
    let best = parents[v].iter().map(|&p| finish(p, time, parents, memo)).max().unwrap_or(0);
    let ans = time[v] + best;
    memo.insert(v.to_string(), ans);
    ans
}`
  },
  countPrograms23: {
    python: `from functools import lru_cache

@lru_cache(None)
def ways(x):
    if x == 20:
        return 1
    if x > 20 or x == 14:
        return 0
    return ways(x + 1) + ways(x * 2)

print(ways(2))`,
    java: `static int[] memo = new int[1000];

static int ways(int x) {
  if (x == 20) return 1;
  if (x > 20 || x == 14) return 0;
  if (memo[x] != 0) return memo[x];
  return memo[x] = ways(x + 1) + ways(x * 2);
}`,
    cpp: `vector<int> memo(1000, -1);
int ways(int x) {
  if (x == 20) return 1;
  if (x > 20 || x == 14) return 0;
  if (memo[x] != -1) return memo[x];
  return memo[x] = ways(x + 1) + ways(x * 2);
}`,
    rust: `fn ways(x: i32, memo: &mut Vec<i32>) -> i32 {
    if x == 20 { return 1; }
    if x > 20 || x == 14 { return 0; }
    if memo[x as usize] != -1 { return memo[x as usize]; }
    let ans = ways(x + 1, memo) + ways(x * 2, memo);
    memo[x as usize] = ans;
    ans
}`
  },
  strings24: {
    python: `s = open("24.txt").readline().strip()
left = 0
count_a = 0
best = 0
for right, ch in enumerate(s):
    if ch == "A":
        count_a += 1
    while count_a > 2:  # Замени условие на ограничение из своей задачи.
        if s[left] == "A":
            count_a -= 1
        left += 1
    best = max(best, right - left + 1)
print(best)`,
    java: `String s = Files.readString(Path.of("24.txt")).trim();
int left = 0, countA = 0, best = 0;
for (int right = 0; right < s.length(); right++) {
  if (s.charAt(right) == 'A') countA++;
  while (countA > 2) {
    if (s.charAt(left) == 'A') countA--;
    left++;
  }
  best = Math.max(best, right - left + 1);
}
System.out.println(best);`,
    cpp: `string s; ifstream("24.txt") >> s;
int left = 0, countA = 0, best = 0;
for (int right = 0; right < (int)s.size(); ++right) {
  if (s[right] == 'A') countA++;
  while (countA > 2) {
    if (s[left] == 'A') countA--;
    left++;
  }
  best = max(best, right - left + 1);
}
cout << best;`,
    rust: `let s = std::fs::read_to_string("24.txt").unwrap().trim().to_string();
let bytes = s.as_bytes();
let (mut left, mut count_a, mut best) = (0usize, 0usize, 0usize);
for right in 0..bytes.len() {
    if bytes[right] == b'A' { count_a += 1; }
    while count_a > 2 {
        if bytes[left] == b'A' { count_a -= 1; }
        left += 1;
    }
    best = best.max(right - left + 1);
}
println!("{}", best);`
  },
  divisors25: {
    python: `def divisors(n):
    d = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            d.append(i)
            if i * i != n:
                d.append(n // i)
        i += 1
    return sorted(d)

for n in range(100000, 100500):
    ds = divisors(n)
    if len(ds) == 6:
        print(n, ds)`,
    java: `for (int n = 100000; n < 100500; n++) {
  List<Integer> d = new ArrayList<>();
  for (int i = 1; i * i <= n; i++) {
    if (n % i == 0) {
      d.add(i);
      if (i * i != n) d.add(n / i);
    }
  }
  if (d.size() == 6) System.out.println(n + " " + d);
}`,
    cpp: `for (int n = 100000; n < 100500; ++n) {
  vector<int> d;
  for (int i = 1; i * i <= n; ++i) {
    if (n % i == 0) {
      d.push_back(i);
      if (i * i != n) d.push_back(n / i);
    }
  }
  if (d.size() == 6) cout << n << '\n';
}`,
    rust: `for n in 100000..100500 {
    let mut d = Vec::new();
    let mut i = 1;
    while i * i <= n {
        if n % i == 0 {
            d.push(i);
            if i * i != n { d.push(n / i); }
        }
        i += 1;
    }
    if d.len() == 6 { println!("{} {:?}", n, d); }
}`
  },
  greedy26: {
    python: `with open("26.txt") as f:
    n, s = map(int, f.readline().split())
    a = sorted(int(x) for x in f)

count = 0
total = 0
for x in a:
    if total + x <= s:
        total += x
        count += 1
    else:
        break

best = a[count - 1]
for i in range(count, n):
    if total - best + a[i] <= s:
        total = total - best + a[i]
        best = a[i]
print(count, best)`,
    java: `List<Integer> a = Files.lines(Path.of("26.txt")).skip(1).map(Integer::parseInt).sorted().toList();
String[] first = Files.readAllLines(Path.of("26.txt")).get(0).split(" ");
int s = Integer.parseInt(first[1]);
int count = 0, total = 0;
while (count < a.size() && total + a.get(count) <= s) total += a.get(count++);
int best = a.get(count - 1);
for (int i = count; i < a.size(); i++) {
  if (total - best + a.get(i) <= s) {
    total = total - best + a.get(i);
    best = a.get(i);
  }
}
System.out.println(count + " " + best);`,
    cpp: `ifstream in("26.txt");
int n, s; in >> n >> s;
vector<int> a(n);
for (int &x : a) in >> x;
sort(a.begin(), a.end());
int count = 0, total = 0;
while (count < n && total + a[count] <= s) total += a[count++];
int best = a[count - 1];
for (int i = count; i < n; ++i) {
  if (total - best + a[i] <= s) {
    total = total - best + a[i];
    best = a[i];
  }
}
cout << count << ' ' << best;`,
    rust: `let text = std::fs::read_to_string("26.txt").unwrap();
let mut it = text.lines();
let first: Vec<i32> = it.next().unwrap().split_whitespace().map(|x| x.parse().unwrap()).collect();
let mut a: Vec<i32> = it.map(|x| x.parse().unwrap()).collect();
a.sort();
let (n, s) = (first[0] as usize, first[1]);
let (mut count, mut total) = (0usize, 0i32);
while count < n && total + a[count] <= s { total += a[count]; count += 1; }
let mut best = a[count - 1];
for i in count..n {
    if total - best + a[i] <= s {
        total = total - best + a[i];
        best = a[i];
    }
}
println!("{} {}", count, best);`
  },
  clusters27: {
    python: `from math import hypot

points = [(0, 0), (0.1, 0.2), (5, 5), (5.2, 4.9)]
limit = 0.5
used = [False] * len(points)
clusters = []

for i in range(len(points)):
    if used[i]:
        continue
    stack = [i]
    used[i] = True
    comp = []
    while stack:
        v = stack.pop()
        comp.append(points[v])
        for u in range(len(points)):
            if not used[u] and hypot(points[v][0] - points[u][0], points[v][1] - points[u][1]) <= limit:
                used[u] = True
                stack.append(u)
    clusters.append(comp)

def medoid(cluster):
    return min(cluster, key=lambda p: sum(hypot(p[0] - q[0], p[1] - q[1]) for q in cluster))

centers = [medoid(cluster) for cluster in clusters]
print(centers)`,
    java: `double[][] points = {{0,0}, {0.1,0.2}, {5,5}, {5.2,4.9}};
double limit = 0.5;
boolean[] used = new boolean[points.length];
List<List<Integer>> clusters = new ArrayList<>();

for (int i = 0; i < points.length; i++) {
  if (used[i]) continue;
  List<Integer> comp = new ArrayList<>();
  Deque<Integer> st = new ArrayDeque<>();
  st.push(i);
  used[i] = true;
  while (!st.isEmpty()) {
    int v = st.pop();
    comp.add(v);
    for (int u = 0; u < points.length; u++) {
      if (!used[u] && dist(points[v], points[u]) <= limit) {
        used[u] = true;
        st.push(u);
      }
    }
  }
  clusters.add(comp);
}`,
    cpp: `vector<pair<double,double>> points{{0,0}, {0.1,0.2}, {5,5}, {5.2,4.9}};
double limit = 0.5;
vector<int> used(points.size());
vector<vector<int>> clusters;

auto dist = [&](int i, int j) {
  return hypot(points[i].first - points[j].first, points[i].second - points[j].second);
};

for (int i = 0; i < (int)points.size(); ++i) {
  if (used[i]) continue;
  vector<int> comp;
  stack<int> st;
  st.push(i);
  used[i] = 1;
  while (!st.empty()) {
    int v = st.top(); st.pop();
    comp.push_back(v);
    for (int u = 0; u < (int)points.size(); ++u) {
      if (!used[u] && dist(v, u) <= limit) { used[u] = 1; st.push(u); }
    }
  }
  clusters.push_back(comp);
}`,
    rust: `let points = vec![(0.0_f64, 0.0_f64), (0.1, 0.2), (5.0, 5.0), (5.2, 4.9)];
let limit = 0.5_f64;
let mut used = vec![false; points.len()];
let mut clusters: Vec<Vec<usize>> = Vec::new();

for i in 0..points.len() {
    if used[i] { continue; }
    let mut st = vec![i];
    let mut comp = Vec::new();
    used[i] = true;
    while let Some(v) = st.pop() {
        comp.push(v);
        for u in 0..points.len() {
            let dx = points[v].0 - points[u].0;
            let dy = points[v].1 - points[u].1;
            if !used[u] && (dx * dx + dy * dy).sqrt() <= limit {
                used[u] = true;
                st.push(u);
            }
        }
    }
    clusters.push(comp);
}`
  }
};

const tasks = [
  {
    number: 1,
    title: "Анализ информационных моделей",
    type: "model",
    codeKey: "infoModel",
    summary: "Таблицы, схемы, маршруты и соответствия. Обычно нужно восстановить, кто с чем связан.",
    points: ["соответствия", "ограничения", "перестановки"],
    condition: [
      "Есть несколько объектов: города, люди, дороги, рейсы, станции или фамилии.",
      "Часть связей дана напрямую, часть надо вывести по таблице или схеме."
    ],
    steps: [
      "Сначала выпиши все уникальные признаки и жёсткие запреты.",
      "Дальше либо доводи таблицу вручную, либо перебирай перестановки и оставляй только допустимые.",
      "Проверяй не только локальное условие, а всю конфигурацию сразу."
    ],
    answer: "Обычно в ответе одно имя, номер вершины, маршрут или одно точное соответствие."
  },
  {
    number: 2,
    title: "Составление таблицы истинности",
    type: "logic",
    codeKey: "truthTable",
    summary: "Нужно восстановить порядок переменных и понять, какие строки таблицы подходят формуле.",
    points: ["0/1", "формула", "порядок переменных"],
    condition: [
      "Дана логическая формула и неполная таблица истинности или её фрагмент.",
      "Надо определить, какой столбец соответствует какой переменной."
    ],
    steps: [
      "Перебери все наборы значений переменных.",
      "Для каждого набора вычисли значение формулы без ошибок в приоритетах операций.",
      "Сопоставь полученные строки с таблицей и проверь все перестановки названий столбцов."
    ],
    answer: "Ответом обычно является порядок переменных, записанный без пробелов."
  },
  {
    number: 3,
    title: "Поиск и сортировка в базах данных",
    type: "database",
    codeKey: "database",
    summary: "Реальная тема номера 3: фильтрация записей, сортировка и агрегаты по таблице данных.",
    points: ["CSV", "фильтр", "агрегат"],
    condition: [
      "Дана таблица с несколькими полями: категория, регион, баллы, количество и так далее.",
      "Нужно отфильтровать строки и посчитать сумму, максимум, минимум или количество."
    ],
    steps: [
      "Определи поля, которые участвуют в условии, и поля, которые участвуют в ответе.",
      "Сначала фильтруй строки, потом только по отобранным считай агрегат.",
      "Если есть сортировка, проверь, что она действительно нужна, а не маскирует простой отбор."
    ],
    answer: "В ответе чаще всего одно число: сумма, количество записей или нужное значение поля."
  },
  {
    number: 4,
    title: "Кодирование и декодирование данных",
    type: "encoding",
    codeKey: "coding",
    summary: "Мощность алфавита, длина кода, минимальное число бит и объём сообщения.",
    points: ["log2", "биты", "байты"],
    condition: [
      "Известны размер алфавита, число символов, длины кодов или ограничения на кодирование.",
      "Надо найти длину кода, общий объём данных или недостающий параметр."
    ],
    steps: [
      "Найди количество бит на один символ: обычно это ceiling(log2(N)).",
      "Перемножь на количество символов или объектов.",
      "В конце переведи биты в байты, килобайты или наоборот ровно в тех единицах, что просит условие."
    ],
    answer: "Чаще всего это одно число: длина кода, объём памяти или количество символов."
  },
  {
    number: 5,
    title: "Выполнение и анализ простых алгоритмов",
    type: "algorithm",
    codeKey: "binaryAlgo",
    summary: "Классический номер на преобразование числа по правилу, чаще всего в двоичной записи.",
    points: ["двоичная запись", "перебор", "минимум"],
    condition: [
      "Есть число N и алгоритм, который строит новое число R по записи N.",
      "Нужно найти минимальное или максимальное N, дающее нужный результат."
    ],
    steps: [
      "Перебирай N в разумном диапазоне, обычно начиная с 1.",
      "Аккуратно реализуй шаги преобразования записи без сокращений в уме.",
      "Проверяй условие на готовое число R и обновляй лучший ответ."
    ],
    answer: "Ответом почти всегда является исходное число N или полученное число R."
  },
  {
    number: 6,
    title: "Анализ программ для исполнителей с циклами",
    type: "executor",
    codeKey: "executorLoops",
    summary: "Команды исполнителя, повороты, циклы и геометрический смысл траектории.",
    points: ["координаты", "повороты", "цикл"],
    condition: [
      "Дан исполнитель вроде Черепахи, Робота или формальный набор команд с повторениями.",
      "Надо определить конечную точку, площадь, количество точек или другую характеристику траектории."
    ],
    steps: [
      "Удобно моделировать координаты и направление, а не держать рисунок только в голове.",
      "Повороты на 90 градусов лучше хранить через вектор направления.",
      "Если спрашивают площадь или количество целых точек, сначала построй весь контур или набор посещений."
    ],
    answer: "Ответ зависит от задачи: координаты, площадь, длина пути или число клеток."
  },
  {
    number: 7,
    title: "Кодирование графической, звуковой и видеоинформации",
    type: "media",
    codeKey: "media",
    summary: "Объём файла, скорость передачи, частота дискретизации, глубина цвета и время передачи.",
    points: ["размер файла", "скорость", "формулы"],
    condition: [
      "Есть параметры изображения, звука или канала связи.",
      "Нужно найти объём, время передачи, частоту, глубину или разрешение."
    ],
    steps: [
      "Сведи задачу к одной базовой формуле: объём равен произведению параметров.",
      "Не забывай про количество каналов и единицы измерения.",
      "Если есть передача, дели общий объём в битах на скорость канала в битах в секунду."
    ],
    answer: "Обычно одно число в нужных единицах измерения."
  },
  {
    number: 8,
    title: "Кодирование, комбинаторика",
    type: "combinatorics",
    codeKey: "combinatorics",
    summary: "Подсчёт слов, кодов, номеров и последовательностей с ограничениями на символы и позиции.",
    points: ["product", "слова", "ограничения"],
    condition: [
      "Нужно посчитать количество слов, кодов или номеров фиксированной длины.",
      "Есть запреты на повторения, позиции, число вхождений или соседство символов."
    ],
    steps: [
      "Если длина маленькая, удобно сделать полный перебор всех слов.",
      "Каждый вариант проверяй на ограничения ровно так, как они написаны в условии.",
      "Для задач без кода смотри, не раскладывается ли ответ на произведение независимых выборов."
    ],
    answer: "В ответе одно число: количество допустимых вариантов."
  },
  {
    number: 9,
    title: "Встроенные функции в электронных таблицах",
    type: "sheets",
    codeKey: "spreadsheet",
    summary: "Табличные вычисления по строкам: суммы, средние, сравнения и условия как в Excel или Calc.",
    points: ["строки", "формулы", "подсчёт"],
    condition: [
      "Дан файл таблицы, где для каждой строки нужно вычислить условие или формулу.",
      "Обычно спрашивают количество строк, максимум среди подходящих или итоговое значение."
    ],
    steps: [
      "Каждую строку рассматривай как независимый набор чисел.",
      "Сначала воспроизведи формулу электронной таблицы, потом считай итог по всем строкам.",
      "Следи, что сравниваются именно нужные столбцы и в том порядке, как в условии."
    ],
    answer: "Чаще всего количество строк или одно итоговое число."
  },
  {
    number: 10,
    title: "Поиск слов в текстовом документе",
    type: "text",
    codeKey: "textSearch",
    summary: "Текстовый анализ: сколько раз встречается слово, словоформа или фрагмент в документе.",
    points: ["текст", "слова", "поиск"],
    condition: [
      "Есть текстовый файл и правило поиска слова или фрагмента.",
      "Надо посчитать точные вхождения, обычно без ошибок в границах слова и регистре."
    ],
    steps: [
      "Приведи текст к одному регистру, если это не запрещено задачей.",
      "Определи, нужен ли поиск целого слова или просто подстроки.",
      "Проверь, влияют ли знаки препинания, переносы и формы слов на подсчёт."
    ],
    answer: "Обычно это количество найденных вхождений."
  },
  {
    number: 11,
    title: "Вычисление количества информации",
    type: "info",
    codeKey: "infoAmount",
    summary: "Идентификаторы, карточки, пользователи, сообщения и объём памяти на один объект.",
    points: ["ceil(log2)", "идентификатор", "объём"],
    condition: [
      "Есть число объектов и набор полей, для которых нужен минимальный объём хранения.",
      "Нужно вычислить длину идентификатора, полный размер записи или количество записей."
    ],
    steps: [
      "Для каждого поля найди минимальное число бит, достаточное для всех значений.",
      "Если хранение идёт по байтам, округляй вверх до целого числа байт.",
      "Складывай объёмы полей только после приведения к одной единице измерения."
    ],
    answer: "Чаще всего ищут количество бит или байт на запись либо общий объём."
  },
  {
    number: 12,
    title: "Выполнение алгоритмов для исполнителя",
    type: "editor",
    codeKey: "editor",
    summary: "Номер про Редактор: замены строк по шаблону до тех пор, пока они возможны.",
    points: ["replace", "while", "порядок операций"],
    condition: [
      "Есть исходная строка и правила замен вида заменить первое вхождение.",
      "Нужно получить конечную строку или её характеристику после завершения алгоритма."
    ],
    steps: [
      "Всегда учитывай, что замена обычно делается только для первого вхождения.",
      "Порядок замен внутри цикла влияет на ответ, менять его нельзя.",
      "После каждой итерации проверяй условие цикла заново."
    ],
    answer: "В ответе конечная строка, сумма цифр или другая её характеристика."
  },
  {
    number: 13,
    title: "IP-адреса и маски",
    type: "ip",
    codeKey: "ipMask",
    summary: "Актуальная тема номера 13: сеть, маска, число адресов, адрес сети и свойства двоичной записи.",
    points: ["IP", "mask", "битовые операции"],
    condition: [
      "Дан IP-адрес, маска или часть двоичной записи адреса.",
      "Надо найти адрес сети, число единиц в маске, диапазон адресов или подходящее значение байта."
    ],
    steps: [
      "Переводи IP и маску в 32-битные числа и используй побитовое И для сети.",
      "Число адресов в подсети равно 2 в степени количества нулей в маске.",
      "Если задача на перебор байта, генерируй кандидатов и проверяй условие программно."
    ],
    answer: "Обычно одно число, один байт, адрес сети или количество адресов."
  },
  {
    number: 14,
    title: "Позиционные системы счисления",
    type: "systems",
    codeKey: "numeralSystems",
    summary: "Запись числа в разных основаниях, подсчёт цифр, работа с огромными степенями и выражениями.",
    points: ["основание", "остатки", "цифры"],
    condition: [
      "Дано выражение со степенями или большим числом, которое надо представить в некотором основании.",
      "Часто спрашивают количество цифр, число определённых символов или последнюю цифру записи."
    ],
    steps: [
      "Сначала вычисли выражение или используй свойства степеней, если число очень большое.",
      "Чтобы получить запись в основании p, дели число на p и собирай остатки.",
      "Если нужен только счёт цифр, достаточно прохода по остаткам без хранения всей строки."
    ],
    answer: "Чаще всего это количество цифр определённого вида или сама запись/её фрагмент."
  },
  {
    number: 15,
    title: "Анализ истинности логического выражения",
    type: "logicA",
    codeKey: "logicA",
    summary: "Подбор такого A, чтобы формула была истинна для всех x. Часто появляются отрезки, множества и делимость.",
    points: ["для всех x", "A", "перебор"],
    condition: [
      "Есть логическая формула с параметром A и универсальным квантором по x.",
      "Внутри формулы обычно условия на отрезки, делимость или принадлежность множествам."
    ],
    steps: [
      "Перебирай допустимые значения A в разумном диапазоне.",
      "Для каждого A проверяй формулу на всех x из нужной области поиска.",
      "Как только найдено минимальное или максимальное A, прекращай перебор."
    ],
    answer: "Обычно минимальное или максимальное подходящее значение A."
  },
  {
    number: 16,
    title: "Рекурсивные алгоритмы",
    type: "recursion",
    codeKey: "recursion",
    summary: "Функция задана рекуррентно: надо вычислить значение, количество вызовов или исследовать поведение.",
    points: ["база", "рекурсия", "memoization"],
    condition: [
      "Есть рекурсивное определение функции с одной или несколькими ветвями.",
      "Надо найти значение f(n), сумму значений, число вызовов или похожий результат."
    ],
    steps: [
      "Чётко выпиши базовые случаи, иначе легко уйти в бесконечную рекурсию.",
      "Если одна и та же функция вызывается много раз, добавь мемоизацию.",
      "Для больших n иногда проще перейти от рекурсии к циклу и таблице."
    ],
    answer: "В ответе обычно одно число, полученное из функции или подсчёта вызовов."
  },
  {
    number: 17,
    title: "Обработка последовательности чисел",
    type: "sequence",
    codeKey: "sequence17",
    summary: "Файл с целыми числами, пары и тройки, условия на делимость, максимум, минимум и количество.",
    points: ["файл", "окно", "пары/тройки"],
    condition: [
      "Есть файл с последовательностью чисел и условие на соседние пары, тройки или более длинные окна.",
      "Нужно посчитать количество подходящих окон и найти лучший по условию результат."
    ],
    steps: [
      "Сначала прочитай весь файл в массив.",
      "Потом иди окном нужной длины и проверяй условие для каждого окна.",
      "Отдельно поддерживай счётчик количества и оптимум: максимум, минимум или сумму."
    ],
    answer: "Обычно два числа: количество и лучший найденный результат."
  },
  {
    number: 18,
    title: "Динамическое программирование",
    type: "dynamic",
    codeKey: "dynamic18",
    summary: "Клетчатое поле или таблица. Нужно найти максимум, минимум или количество путей по переходам.",
    points: ["таблица", "ДП", "переходы"],
    condition: [
      "Есть матрица чисел и разрешённые переходы по клеткам.",
      "Нужно вычислить лучший результат в конечной клетке: максимум, минимум или число способов."
    ],
    steps: [
      "Заведи таблицу dp такого же размера, как исходное поле.",
      "Для каждой клетки обновляй значение из тех направлений, из которых можно прийти.",
      "Начальную клетку и недостижимые состояния инициализируй отдельно."
    ],
    answer: "Ответом обычно является значение в правом нижнем или другом указанном состоянии."
  },
  {
    number: 19,
    title: "Теория игр: выигрыш первым ходом",
    type: "games",
    codeKey: "games",
    summary: "Первая задача из блока 19-21: позиции, из которых первый игрок может выиграть сразу или при точной стратегии.",
    points: ["игра", "позиции", "рекурсия"],
    condition: [
      "Есть начальное количество камней или другая позиция и набор разрешённых ходов.",
      "Нужно классифицировать позиции по глубине выигрыша."
    ],
    steps: [
      "Конечная позиция обычно проигрышная для того, кто должен ходить.",
      "Позиция выигрышная, если есть ход в проигрышную.",
      "Для номера 19 смотри прежде всего позиции класса В1 или их эквивалент."
    ],
    answer: "Обычно нужно перечислить стартовые значения, подходящие под условие первого вопроса."
  },
  {
    number: 20,
    title: "Теория игр: выигрыш не позднее второго хода",
    type: "games",
    codeKey: "games",
    summary: "Вторая задача игрового блока: позиции, где победа достигается ко второму ходу при правильной игре.",
    points: ["P1/V1", "глубина", "анализ всех ходов"],
    condition: [
      "Те же правила игры, что и в 19, но вопрос уже про следующий уровень позиций.",
      "Нужно учесть и свои, и ответные ходы соперника."
    ],
    steps: [
      "Построй те же классы позиций, что в 19, но анализируй следующий уровень глубины.",
      "Позиция попадает в нужный класс, если после любого хода соперника у тебя остаётся выигрышный ответ.",
      "Не путай есть ход и любой ход: в задачах 20 это критично."
    ],
    answer: "Обычно одно или несколько стартовых значений S."
  },
  {
    number: 21,
    title: "Теория игр: гарантированная стратегия",
    type: "games",
    codeKey: "games",
    summary: "Третья задача игрового блока: гарантированная победа к нужному ходу при любых ответах соперника.",
    points: ["гарантия", "all", "стратегия"],
    condition: [
      "Те же ходы и порог окончания, но вопрос формулируется жёстче всего.",
      "Нужно найти позиции с гарантированной стратегией победы за заданное число ходов."
    ],
    steps: [
      "Определи, какие классы позиций соответствуют нужной формулировке вопроса.",
      "В нужных местах используй логику any/all: существует ход или любой ответ соперника.",
      "Проверяй именно формулировку 21, потому что она обычно отличается одной фразой, но меняет класс ответа."
    ],
    answer: "Ответом обычно служит множество начальных S по самому сильному условию блока."
  },
  {
    number: 22,
    title: "Выполнение параллельных процессов",
    type: "processes",
    codeKey: "processes22",
    summary: "Процессы с зависимостями. По сути это DAG и задача на время завершения по критическому пути.",
    points: ["DAG", "зависимости", "критический путь"],
    condition: [
      "Каждый процесс имеет длительность и список процессов, которые должны завершиться раньше.",
      "Нужно вычислить минимальное время завершения всей системы или отдельного процесса."
    ],
    steps: [
      "Считай, что время завершения вершины равно её длительности плюс максимум по предкам.",
      "Если предков нет, процесс может стартовать сразу.",
      "Удобнее всего решать через DFS с мемоизацией или через топологический порядок."
    ],
    answer: "Чаще всего одно число: минимальное время окончания всех работ."
  },
  {
    number: 23,
    title: "Перебор вариантов, динамическое программирование",
    type: "programs",
    codeKey: "countPrograms23",
    summary: "Сколько программ переводят число A в число B по заданным командам и запретам.",
    points: ["количество программ", "рекурсия", "запреты"],
    condition: [
      "Есть стартовое число, финиш и несколько команд преобразования.",
      "Иногда есть запретные вершины или обязательная промежуточная точка."
    ],
    steps: [
      "Определи рекуррентное соотношение: ways(x) как сумма способов из следующих состояний.",
      "Если есть запреты, сразу возвращай 0 для запрещённых состояний.",
      "Если маршрут должен проходить через точку K, считай отдельно ways(A, K) и ways(K, B), а потом перемножай."
    ],
    answer: "Ответ всегда количество программ или количество путей."
  },
  {
    number: 24,
    title: "Обработка символьных строк",
    type: "strings",
    codeKey: "strings24",
    summary: "Номер 24 почти всегда сводится к поиску самого длинного или самого короткого подходящего фрагмента строки.",
    points: ["строка", "скользящее окно", "максимальный фрагмент"],
    condition: [
      "Есть очень длинная строка из файла.",
      "Нужно найти длину или позицию фрагмента с ограничением на символы, пары, подстроки или количество вхождений."
    ],
    steps: [
      "Для задач на длину фрагмента чаще всего подходит скользящее окно с двумя указателями.",
      "Состояние окна храни в счётчиках, последних позициях или количестве плохих символов.",
      "Условие в цикле shrink нужно адаптировать ровно под текст задачи."
    ],
    answer: "Обычно длина, иногда индекс начала или конца фрагмента."
  },
  {
    number: 25,
    title: "Обработка целых чисел, делители числа",
    type: "divisors",
    codeKey: "divisors25",
    summary: "Поиск чисел с нужными делителями, масками, количеством простых или составных факторов.",
    points: ["делители", "sqrt(n)", "фильтр"],
    condition: [
      "Нужно перебрать числа из диапазона и проверить у каждого арифметическое свойство.",
      "Часто фигурируют делители, простота, количество делителей или маска десятичной записи."
    ],
    steps: [
      "Делители ищи за O(sqrt(n)), а не полным перебором до n.",
      "Собирай только те свойства, которые реально нужны условию.",
      "Если ответ надо печатать по строкам, соблюдай формат в точности."
    ],
    answer: "В ответе обычно несколько чисел или пары значений для всех найденных n."
  },
  {
    number: 26,
    title: "Обработка массива целых чисел из файла",
    type: "fileopt",
    codeKey: "greedy26",
    summary: "Реальный номер 26: сортировка, жадный выбор и аккуратная обработка ограничений из файла.",
    points: ["сортировка", "жадность", "файл"],
    condition: [
      "В первой строке файла часто даны параметры задачи, дальше - массив чисел.",
      "Обычно надо выбрать максимум объектов при ограничении и затем оптимизировать второй критерий."
    ],
    steps: [
      "Почти всегда сначала сортируй данные по ключу, который даёт жадный выбор.",
      "Сначала обеспечь максимум по главному критерию, затем улучши вторичный показатель заменами.",
      "Проверь крайние случаи: одинаковые элементы, точное заполнение лимита, последний подходящий объект."
    ],
    answer: "Часто два числа: максимальное количество и лучший элемент среди выбранных."
  },
  {
    number: 27,
    title: "Кластерный анализ",
    type: "clusters",
    codeKey: "clusters27",
    summary: "Актуальный номер 27 в материалах 2026: точки на плоскости, кластеры и поиск центров кластеров.",
    points: ["точки", "кластеры", "центр"],
    condition: [
      "Есть набор точек и правило, по которому точки попадают в один кластер.",
      "Нужно разбить данные на кластеры, найти центр каждого и затем посчитать итоговую формулу из условия."
    ],
    steps: [
      "Сначала построй связные компоненты или кластеры по правилу близости.",
      "Центр кластера часто берут как медоид: точку с минимальной суммой расстояний до остальных.",
      "Финальное число зависит от условия: иногда нужен центр, иногда сумма координат, иногда масштабирование и округление."
    ],
    answer: "Перед выводом обязательно проверь финальную формулу и требуемое округление из конкретного варианта."
  }
];

const languages = [
  { key: "python", label: "Python" },
  { key: "java", label: "Java" },
  { key: "cpp", label: "C++" },
  { key: "rust", label: "Rust" }
];

const typeLabels = {
  model: "Информационные модели",
  logic: "Логика",
  database: "Базы данных",
  encoding: "Кодирование",
  algorithm: "Простые алгоритмы",
  executor: "Исполнитель",
  media: "Графика и звук",
  combinatorics: "Комбинаторика",
  sheets: "Электронные таблицы",
  text: "Текстовый документ",
  info: "Количество информации",
  editor: "Редактор",
  ip: "IP и маски",
  systems: "Системы счисления",
  logicA: "Логика с параметром A",
  recursion: "Рекурсия",
  sequence: "Последовательности",
  dynamic: "Динамическое программирование",
  games: "Теория игр",
  processes: "Параллельные процессы",
  programs: "Количество программ",
  strings: "Символьные строки",
  divisors: "Делители",
  fileopt: "Файл и оптимизация",
  clusters: "Кластеризация"
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
    task.answer,
    ...task.points,
    ...task.condition,
    ...task.steps
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

  if (!visibleTasks.length) {
    const empty = document.createElement("article");
    empty.className = "task-card";
    empty.innerHTML = "<h3>Ничего не найдено</h3><p class=\"task-summary\">Попробуй другой номер, тему или ключевое слово.</p>";
    taskGrid.appendChild(empty);
    return;
  }

  visibleTasks.forEach((task) => {
    const fragment = taskTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".task-card");
    article.id = `task-${task.number}`;

    fragment.querySelector(".task-number").textContent = `Задание ${task.number}`;
    fragment.querySelector(".task-title").textContent = task.title;
    fragment.querySelector(".task-type").textContent = typeLabels[task.type];
    fragment.querySelector(".task-summary").textContent = task.summary;
    fragment.querySelector(".task-answer").textContent = `Что в ответе: ${task.answer}`;

    const points = fragment.querySelector(".task-points");
    task.points.forEach((point) => {
      const badge = document.createElement("span");
      badge.textContent = point;
      points.appendChild(badge);
    });

    const given = fragment.querySelector(".task-given");
    task.condition.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      given.appendChild(li);
    });

    const steps = fragment.querySelector(".task-steps");
    task.steps.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      steps.appendChild(li);
    });

    const tabs = fragment.querySelector(".task-tabs");
    languages.forEach((language) => tabs.appendChild(createTab(language)));
    fragment.querySelector("code").textContent = codeTemplates[task.codeKey][state.language];

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
