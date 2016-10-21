// View

class View {
	constructor(controller) {
		this.controller = controller;
		this.board = document.getElementById("board");
	}

	getCell(row, col) {
		return this.board.rows[row].cells[col];
	}

	setStone(player, row, col) {
		this.getCell(row, col).innerHTML = player.stone;
		this.getCell(row, col).className = player.stone;
	}
	
}


// Model

class TicTacToe {
	constructor() {
		this.players = [new Player(this, "X"), new Player(this, "O")];
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
		this.players[0].move(row, col);
		//this.check(turn);
		this.players.reverse();
	}

}

class Player {
	constructor(game, stone) {
		this.game = game;
		this.stone = stone;
	}
	move(row, col) {
		this.game.board[row][col] = this.stone;
	}
}


// Controller

class Controller {
	constructor() {
		this.view = new View(this);
		this.game = new TicTacToe();
		this.generateEvents();
	}


	move(row, col) {
		var player = this.game.players[0];
		this.game.move(row, col);
		this.view.setStone(player, row, col);

	}

	generateEvents() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				this.view.getCell(row, col).addEventListener("click", () => this.move(row, col));
			}
		}
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
	controller = new Controller();
};
