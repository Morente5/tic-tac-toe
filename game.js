// View

class View {
	constructor(controller) {
		this.controller = controller;
		this.board = document.getElementById("board");
		this.message = document.getElementById("message");
	}

	getCell(row, col) {
		return this.board.rows[row].cells[col];
	}

	setStone(player, row, col) {
		this.getCell(row, col).innerHTML = player.stone;
		this.getCell(row, col).className = player.stone;
	}

	setMessage(message) {
		this.message.innerHTML = message;
	}
}


// Model

class TicTacToe {
	constructor() {
		this.players = [new Player(this, "X"), new Player(this, "O")].shuffle();
		this.board = [[null, null, null], [null, null, null], [null, null, null]];
		this.winner = null;
	}

	get winningCombinations() { 
		return [
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
		var occupied = this.board[row][col];
		if (!occupied) {
			var move = this.players[0].move(row, col);
			var winn = this.players[0].win();
			this.players.reverse();
			return {movement: move, winner: winn};
		}
	}

}

class Player {
	constructor(game, stone) {
		this.game = game;
		this.stone = stone;
	}

	move(row, col) {
		this.game.board[row][col] = this;
	}

	win() {
		if (this.game.winningCombinations.some(elem => elem.every(elem2 => elem2 == this))) {
			this.game.winner = this;
			return this;
		}
		else {
			return null;
		}
	}

}


// Controller

class Controller {
	constructor() {
		this.game = new TicTacToe();
		this.view = new View(this);
		this.generateEvents();
		this.view.setMessage(this.game.players[0].stone + " turn");
	}

	generateEvents() {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				this.view.getCell(row, col).addEventListener("click", () => this.click(row, col));
			}
		}
	}

	click(row, col) {
		// Only if there is no winner
		if (!this.game.winner) {
			var player = this.game.players[0];
			var result = this.game.move(row, col);
			// If movement was successful, set stone and message
			if (result.movement) {
				this.view.setStone(player, row, col);
				this.view.setMessage(this.game.players[0].stone + " turn");
			}
			if (result.winner) {
				this.view.setMessage(player.stone + " won");
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
