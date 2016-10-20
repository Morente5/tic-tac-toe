// View

class View {
	constructor(controller) {
		this.controller = controller;
		this.board = document.getElementById("board");
	}

	getCell(row, col) {
		return this.board.rows[row].cells[col];
	}

	generateEvents() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				getCell(row, col).addEventListener("click", this.controller.move());
			}
		}
	}

	setStone(player, row, col) {
		getCell(row, col).InnerHTML = player.stone;
	}
	
}


// Controller

class Controller {
	constructor(view, game) {
		this.view = new View(this);
		this.game = new ticTacToe();
	}

	setStone(player, row, col) {
		getCell(row, col).InnerHTML = player.stone;
	}

	move(row, col) {
		var player = this.game.player[0];
		this.game().move(row, col);
		this.setStone(player, row, col);
	}
}


// Model

class Player {
	constructor(ticTacToe, stone) {
		self.ticTacToe = ticTacToe;
		self.stone = stone;
	}
	move(row, col) {
		self.ticTacToe.board[row][col] = this;
	}
}

class TicTacToe {
	constructor() {
		this.players = [Player(this, "X"), Player(this, "O")].shuffle();
		this.board = [[null, null, null], [null, null, null], [null, null, null]];
		this.winningCombinations = [
			// rows
			[this.board[0][0], this.board[0][1], this.board[0][2]],
			[this.board[1][0], this.board[1][1], this.board[1][2]],
			[this.board[2][0], this.board[2][1], this.board[2][2]],
			// columns
			[this.board[0][0], this.board[1][0], this.board[2][0]],
			[this.board[0][1], this.board[1][1], this.board[2][1]],
			[this.board[0][2], this.board[1][2], this.board[2][2]],
			// diagonal
			[this.board[0][0], this.board[1][1], this.board[2][2]],
			[this.board[0][2], this.board[1][1], this.board[2][1]],
			];
	}

	move(row, col) {
		self.players[0].move(row, col);
		self.check(turn);
		self.players.reverse();
	}

}

Array.prototype.shuffle = function () {
    var m = this.length;
    while (m) {
        let i = Math.floor(Math.random() * m--);
        [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
};

window.onload = function() {
	controller = new Controller(view, new TicTacToe());
};
