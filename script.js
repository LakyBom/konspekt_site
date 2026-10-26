const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const complexityInfo = {
  constant: { badge: "O(1) · ПОСТОЯННАЯ", title: "Число операций не растёт вместе с n", description: "Выполняется фиксированное количество действий. Это не обязательно одна операция — важно, что их число не зависит от размера входа.", code: "value = arr[0]  # доступ по индексу\nleft, right = right, left  # обмен" },
  log: { badge: "O(log n) · ЛОГАРИФМИЧЕСКАЯ", title: "На каждом шаге задача уменьшается", description: "Если размер задачи делится на постоянный коэффициент, количество шагов растёт логарифмически. Основание логарифма в Big O обычно несущественно.", code: "i = 1\nwhile i < n:\n    i *= 2  # примерно log₂(n) шагов" },
  linear: { badge: "O(n) · ЛИНЕЙНАЯ", title: "Каждый элемент обрабатывается ограниченное число раз", description: "Один проход по массиву из n элементов даёт линейное число операций. Удвоение входа примерно удваивает работу.", code: "for value in arr:\n    process(value)  # O(1) на элемент" },
  nlogn: { badge: "O(n log n) · ЛИНЕЙНО-ЛОГАРИФМИЧЕСКАЯ", title: "Линейная работа на каждом из log n уровней", description: "Так часто работают эффективные алгоритмы «разделяй и властвуй», например сортировка слиянием.", code: "merge_sort(arr)  # O(n log n)\n# делим массив, затем сливаем части" },
  quadratic: { badge: "O(n²) · КВАДРАТИЧНАЯ", title: "Количество пар растёт как квадрат n", description: "Два вложенных цикла по n элементов часто дают n × n операций. Для больших входов такая разница быстро становится заметной.", code: "for i in range(n):\n    for j in range(n):\n        compare(i, j)  # O(n²)" },
  exponential: { badge: "O(2ⁿ) · ЭКСПОНЕНЦИАЛЬНАЯ", title: "Каждый новый элемент резко увеличивает перебор", description: "Количество вариантов удваивается при добавлении одного элемента. Такие решения быстро становятся непрактичными.", code: "for mask in range(2 ** n):\n    process_subset(mask)  # O(2ⁿ)" }
};
$$(".complexity-card").forEach(card => card.addEventListener("click", () => {
  $$(".complexity-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  const info = complexityInfo[card.dataset.complexity];
  $("#complexityDetail").innerHTML = `<div class="detail-badge">${info.badge}</div><h3>${info.title}</h3><p>${info.description}</p><code></code>`;
  $("#complexityDetail code").textContent = info.code;
}));

const examples = {
  search: {
    label: "ПОИСК ЭЛЕМЕНТА", title: "Линейный поиск",
    description: "Последовательно проверяем элементы, пока не найдём цель или не закончим список.",
    best: "O(1)", worst: "O(n)", tip: "Если цель стоит первой, выполняется одно сравнение.",
    code: "def search(arr, target):\n    for i, value in enumerate(arr):\n        if value == target:\n            return i\n    return -1\n\nprint(search([1, 10, 30, 15], 30))  # 2",
    output: "2"
  },
  special: {
    label: "УСЛОВИЕ ПО ДЛИНЕ", title: "Специальная сумма",
    description: "Если длина массива чётная, сразу возвращаем 0. Если нечётная — суммируем все элементы.",
    best: "O(1)", worst: "O(n)", tip: "Чётная длина даёт O(1), нечётная — O(n). В худшем случае это O(n).",
    code: "def get_sum(arr):\n    n = len(arr)\n    if n % 2 == 0:\n        return 0\n    total = 0\n    for value in arr:\n        total += value\n    return total\n\nprint(get_sum([1, 2, 3, 4]))     # 0\nprint(get_sum([1, 2, 3, 4, 5])) # 15",
    output: "0\\n15"
  },
  binary: {
    label: "ПОИСК В ОТСОРТИРОВАННОМ МАССИВЕ", title: "Двоичный поиск",
    description: "Сравниваем цель со средним элементом и каждый раз отбрасываем половину оставшегося диапазона. Массив должен быть отсортирован.",
    best: "O(1)", worst: "O(log n)", tip: "Половина кандидатов отбрасывается на каждом шаге, поэтому рост логарифмический.",
    code: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(binary_search([1, 10, 15, 30], 30))  # 3",
    output: "3"
  }
};
$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
  tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
  const e = examples[tab.dataset.tab];
  $("#exampleLabel").textContent = e.label;
  $("#exampleTitle").textContent = e.title;
  $("#exampleDescription").textContent = e.description;
  $("#bestCase").textContent = e.best;
  $("#worstCase").textContent = e.worst;
  $("#exampleTip").lastElementChild.textContent = e.tip;
  $("#exampleCode").textContent = e.code;
  $("#exampleOutput").textContent = e.output;
}));

$("#copyCode").addEventListener("click", async () => {
  const button = $("#copyCode");
  try {
    await navigator.clipboard.writeText($("#exampleCode").textContent);
    button.textContent = "Скопировано ✓";
  } catch {
    button.textContent = "Не удалось";
  }
  setTimeout(() => button.textContent = "Копировать", 1600);
});

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  $("#themeToggle").textContent = light ? "☀" : "☾";
  $("#themeToggle").setAttribute("aria-label", light ? "Включить тёмную тему" : "Включить светлую тему");
});

const questions = [
  { q: "Какова сложность доступа к элементу списка по индексу?", a: ["O(n)", "O(1)", "O(n²)"], correct: 1, why: "В обычном массиве доступ по индексу выполняется за постоянное время O(1)." },
  { q: "Какова сложность двух вложенных циклов по n итераций?", a: ["O(n)", "O(log n)", "O(n²)"], correct: 2, why: "Внутренний цикл выполняет n шагов для каждой из n итераций внешнего: n × n = n²." },
  { q: "Что происходит с i в цикле while, если i каждый раз умножается на 2 до достижения n?", a: ["O(log n)", "O(n)", "O(1)"], correct: 0, why: "После k шагов i = 2ᵏ, поэтому до n нужно около log₂(n) шагов." }
];
let questionIndex = 0;
let answered = false;
function renderQuestion() {
  const q = questions[questionIndex];
  $("#quizCount").textContent = `ВОПРОС ${questionIndex + 1} ИЗ ${questions.length}`;
  $("#progressBar").style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  $("#questionText").textContent = q.q;
  $("#answerOptions").innerHTML = q.a.map((answer, i) => `<button class="answer-option" data-answer="${i}">${answer}</button>`).join("");
  $("#quizFeedback").textContent = "Выбери один вариант.";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "Пройти ещё раз ↻" : "Следующий вопрос →";
  answered = false;
  $$(".answer-option").forEach(button => button.addEventListener("click", () => {
    if (answered) return;
    answered = true;
    const selected = Number(button.dataset.answer);
    $$(".answer-option").forEach((b, i) => {
      b.disabled = true;
      if (i === q.correct) b.classList.add("correct");
      if (i === selected && selected !== q.correct) b.classList.add("incorrect");
    });
    $("#quizFeedback").textContent = `${selected === q.correct ? "Верно! " : "Не совсем. "}${q.why}`;
    $("#nextQuestion").disabled = false;
  }));
}
$("#nextQuestion").addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % questions.length;
  renderQuestion();
});
renderQuestion();
