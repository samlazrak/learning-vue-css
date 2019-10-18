<template>
  <div class="calculator">
    <!-- Display -->
    <!-- {{ interpolates data from script }} -->
    <!-- || fallback -->
    <div class="display">{{ current || 0 }}</div>
    <!-- 1st row -->
    <!-- @click="clear" will call the function on the vue component ( script ) -- look into class based with ts-->
    <div @click="clear" class="btn">AC</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <!-- 2nd row -->
    <div @click="append(7)" class="btn">7</div>
    <div @click="append(8)" class="btn">8</div>
    <div @click="append(9)" class="btn">9</div>
    <div @click="multiply" class="btn operator">x</div>
    <!-- 3rd row -->
    <div @click="append(4)" class="btn">4</div>
    <div @click="append(5)" class="btn">5</div>
    <div @click="append(6)" class="btn">6</div>
    <div @click="subtract" class="btn operator">-</div>
    <!-- 4th row-->
    <div @click="append(1)" class="btn">1</div>
    <div @click="append(2)" class="btn">2</div>
    <div @click="append(3)" class="btn">3</div>
    <div @click="add" class="btn operator">+</div>
    <!-- 5th row -->
    <div @click="append(0)" class="btn zero">0</div>
    <div @click="dot()" class="btn">.</div>
    <div @click="equal()" class="btn operator">=</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: "",
      previous: null,
      operator: null,
      operatorClicked: false
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    sign() {
      /* Ternary operator that checks if first character is equal to - Look up ? and : */
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      /* Divides current number by 100 */
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      /* Dodges issues of + and string concat weirdness */
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.setPrevious();
    },
    multiply() {
      this.operator = (a, b) => a * b;
      this.setPrevious();
    },
    subtract() {
      this.operator = (a, b) => a - b;
      this.setPrevious();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.setPrevious();
    },
    equal() {
      /* Parsing to float & then casting to string */
      this.current = `${this.operator(
        parseFloat(this.current),
        parseFloat(this.previous)
      )}`;
      this.previous = null;
    }
  }
};
</script>

<style scoped>
.calculator {
  /* Width reduces the columns width */
  width: 300px;
  /* margin: 0 auto == centered */
  margin: 0 auto;
  font-size: 40px;
  display: grid;
  /* 4 columns repeated with equal width */
  grid-template-columns: repeat(4, 1fr);
  /* auto spacing between rows at least 50 in height */
  grid-auto-rows: minmax(50px, auto);
}

.display {
  /* Start at column 1 end at column 4 */
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}

.zero {
  /* Gives the zero 2/3rds */
  grid-column: 1 / 3;
}

.btn {
  background-color: #f2f2f2;
  border: 1px solid #999;
}

.operator {
  background-color: orange;
  color: white;
}
</style>
