let app = new Vue({
  el: '#app',
  data: {
    shang: 0,
    you: 0,
    xia: 0,
    zuo: 0,
    timer: null,
    grid: [],
    size: 100,
    snake: [],
    food: {
      x: 0,
      y: 0
    }
  },
  created() {
    this.init();
    this.restar();
  },
  methods: {
    init() {
     document.body.onkeyup = e => {
      switch (e.keyCode) {
        case 37: this.move(1);break;
        case 38: this.move(2);break;
        case 39: this.move(3);break;
        case 40: this.move(4);break;
      }
    }
  },
  fill(value) {
    let arr = [];
    for (let i = 0; i < this.size; i++) arr.push(value);
    return arr;
  },
  generate(arrs) {
    let [x, y] = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
    if (x >= 0 && x < this.size && y >= 0 && y < this.size && !arrs[x][y]) [this.food.x, this.food.y] = [x, y];
    else this.generate();
  },
  move(dir) {
    if (!this.checkCan(dir)) return;
    this.clear();
    this.timer = setInterval(() => {
      let [cur_x, cur_y] = [this.snake[0].x, this.snake[0].y];
      switch (dir) {
        case 1: cur_x--;break;
        case 2: cur_y--;break;
        case 3: cur_x++;break;
        case 4: cur_y++;break;
      }
      if (this.check(cur_x, cur_y)) {
        let [head_x, head_y] = [cur_x, cur_y];
        this.snake.forEach((item, index) => {
          let {x, y} = item;
          [item.x, item.y] = [cur_x, cur_y];
          [cur_x, cur_y] = [x, y];
        });
        if (this.grid[head_x][head_y] === 1) {
          this.snake.push({x: cur_x, y: cur_y});
          this.draw(1);
        } else {
          this.draw();
        }
      } else {
        alert('game over');
        clearInterval(this.timer);
        this.restar();
      }
    }, 50);
  },
  clear() {
    if (this.timer) clearInterval(this.timer);    
  },
  check(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size && (!this.grid[x][y] || this.grid[x][y] === 1)
  },
  checkCan(dir) {
    let [cur_x, cur_y] = [this.snake[0].x, this.snake[0].y];
    switch (dir) {
      case 1: cur_x--;break;
      case 2: cur_y--;break;
      case 3: cur_x++;break;
      case 4: cur_y++;break;
    }
    return !(this.snake.length > 1 && cur_x === this.snake[1].x && cur_y === this.snake[1].y);
  },
  draw() {
    let arrs = [];
    for (let i = 0; i < this.size; i++) arrs.push(this.fill(0));
    arrs[this.food.x][this.food.y] = 1;
    this.snake.forEach(item => {
      arrs[item.x][item.y] = 2;
    })
    if (arguments.length) {
      this.generate(arrs);
    }
    arrs[this.food.x][this.food.y] = 1;
    this.grid = arrs;
  },
  restar() {
    let arrs = [];
    for (let i = 0; i < this.size; i++) arrs.push(this.fill(0));
    this.generate(arrs);
    arrs[this.food.x][this.food.y] = 1;
    this.snake = [];
    this.snake.push({x: Math.floor(Math.random() * this.size), y: Math.floor(Math.random() * this.size)});
    arrs[this.snake[0].x][this.snake[0].y] = 2;
    this.grid = arrs;
  }
}
})
