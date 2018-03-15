(function() {
  var EndGamePopOver, GameField, GameState, NewGameButton, TicTacToeCell, TicTacToeCellsMatrix, TitleLabel, div, gameState, h1;

  GameState = (function() {
    class GameState {
      constructor() {
        var x;
        this.gameField = (function() {
          var j, results;
          results = [];
          for (x = j = 0; j <= 8; x = ++j) {
            results.push(Math.pow(2, x));
          }
          return results;
        })();
      }

      currentSymbol() {
        if (this.isX) {
          return 'x';
        } else {
          return 'o';
        }
      }

      currentPlayer() {
        if (this.isX) {
          return this.playerX;
        } else {
          return this.playerO;
        }
      }

      checkWinConditions() {
        var j, len, number, ref;
        ref = this.winningNumbers;
        for (j = 0, len = ref.length; j < len; j++) {
          number = ref[j];
          if ((number & this.currentPlayer()) === number) {
            this.winner = `Player ${this.currentSymbol().toUpperCase()}`;
          }
        }
        if (this.moves > 8) {
          return this.winner = 'Nobody';
        }
      }

      updateCurrentSymbol() {
        return this.isX = !this.isX;
      }

      updateState(index) {
        if (this.isX) {
          this.playerX += this.gameField[index];
        } else {
          this.playerO += this.gameField[index];
        }
        this.moves++;
        this.checkWinConditions();
        return this.updateCurrentSymbol();
      }

      reset() {
        this.isX = true;
        this.playerX = 0;
        this.playerO = 0;
        this.moves = 0;
        return this.winner = null;
      }

    };

    GameState.prototype.isX = true;

    GameState.prototype.playerX = 0;

    GameState.prototype.playerO = 0;

    GameState.prototype.moves = 0;

    GameState.prototype.winner = null;

    GameState.prototype.gameField = null;

    GameState.prototype.winningNumbers = [7, 56, 448, 73, 146, 292, 273, 84];

    return GameState;

  }).call(this);

  gameState = new GameState;

  ({div, h1} = React.DOM);

  document.addEventListener('DOMContentLoaded', function() {
    return React.renderComponent(GameField(), document.body);
  });

  GameField = React.createClass({
    getInitialState: function() {
      return {
        gameIsBeingPlayed: false
      };
    },
    render: function() {
      return div({
        className: 'tic-tac-toe--field',
        children: [
          TicTacToeCellsMatrix({
            onClick: this.onCellClick,
            gameIsBeingPlayed: this.state.gameIsBeingPlayed
          }),
          EndGamePopOver({
            onNewGame: this.onNewGame,
            gameIsBeingPlayed: this.state.gameIsBeingPlayed
          })
        ]
      });
    },
    onNewGame: function() {
      gameState.reset();
      return this.setState({
        gameIsBeingPlayed: true
      });
    },
    onCellClick: function() {
      if (gameState.winner) {
        return this.setState({
          gameIsBeingPlayed: false
        });
      }
    }
  });

  TicTacToeCell = React.createClass({
    getInitialState: function() {
      return {
        symbol: null
      };
    },
    componentWillReceiveProps: function() {
      if (!this.props.gameIsBeingPlayed) {
        return this.setState({
          symbol: null
        });
      }
    },
    render: function() {
      return div({
        className: this.classes(),
        onMouseUp: this.clickHandler
      });
    },
    classes: function() {
      return ['tic-tac-toe-cell', this.state.symbol ? `${this.state.symbol}Symbol` : void 0].join(' ');
    },
    clickHandler: function() {
      if (!this.state.symbol) {
        this.setState({
          symbol: gameState.currentSymbol()
        });
        gameState.updateState(this.props.index);
        return this.props.onClick();
      }
    }
  });

  TicTacToeCellsMatrix = React.createClass({
    render: function() {
      var i;
      return div({
        className: 'tic-tac-toe--cells-matrix',
        children: (function() {
          var j, results;
          results = [];
          for (i = j = 0; j <= 8; i = ++j) {
            results.push(TicTacToeCell({
              index: i,
              gameIsBeingPlayed: this.props.gameIsBeingPlayed,
              onClick: this.props.onClick
            }));
          }
          return results;
        }).call(this)
      });
    }
  });

  EndGamePopOver = React.createClass({
    render: function() {
      

      return div({
        className: this.classes(),
        children: [
          NewGameButton({
            onClick: this.props.onNewGame
          }),
          TitleLabel({
            winner: gameState.winner

          })
        ]
      });
    },
    classes: function() {
      return ['tic-tac-toe--end-game-popover', this.props.gameIsBeingPlayed ? "hidden" : void 0].join(' ');
    }
  });

  TitleLabel = React.createClass({
    render: function() {
       var winner = this.props.winner

      if(this.props.winner!=null) {
          axios.get('/tictactoe/processGameWinner', {
                params: {
                  winner: winner
                }
                
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
        });

      } 

      return h1({
        className: 'tic-tac-toe--title-label',
        children:  this.props.winner ? `${this.props.winner} wins` : void 0
      });

    }
  });

  NewGameButton = React.createClass({
    render: function() {
      return div({
        className: 'tic-tac-toe--new-game-button',
        children: 'New game',
        onMouseUp: this.props.onClick
      });
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLGFBQUEsRUFBQSxhQUFBLEVBQUEsb0JBQUEsRUFBQSxVQUFBLEVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQTs7RUFBTTtJQUFOLE1BQUEsVUFBQTtNQVdFLFdBQWEsQ0FBQSxDQUFBO0FBQ1gsWUFBQTtRQUFBLElBQUMsQ0FBQSxTQUFEOztBQUFjO1VBQUEsS0FBMEIsMEJBQTFCO3lCQUFBLElBQUksQ0FBQyxHQUFMLENBQVUsQ0FBVixFQUFhLENBQWI7VUFBQSxDQUFBOzs7TUFESDs7TUFHYixhQUFlLENBQUEsQ0FBQTtRQUNiLElBQUcsSUFBQyxDQUFBLEdBQUo7aUJBQWEsSUFBYjtTQUFBLE1BQUE7aUJBQXNCLElBQXRCOztNQURhOztNQUdmLGFBQWUsQ0FBQSxDQUFBO1FBQ2IsSUFBRyxJQUFDLENBQUEsR0FBSjtpQkFBYSxJQUFDLENBQUEsUUFBZDtTQUFBLE1BQUE7aUJBQTJCLElBQUMsQ0FBQSxRQUE1Qjs7TUFEYTs7TUFHZixrQkFBb0IsQ0FBQSxDQUFBO0FBQ2xCLFlBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTtRQUFBLEtBQUEscUNBQUE7O1VBQ0UsSUFBRyxDQUFDLE1BQUEsR0FBUyxJQUFDLENBQUEsYUFBRCxDQUFBLENBQVYsQ0FBQSxLQUErQixNQUFsQztZQUNFLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQSxPQUFBLENBQUEsQ0FBVSxJQUFDLENBQUEsYUFBRCxDQUFBLENBQWdCLENBQUMsV0FBakIsQ0FBQSxDQUFWLENBQUEsRUFEWjs7UUFERjtRQUdBLElBQUcsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFaO2lCQUNFLElBQUMsQ0FBQSxNQUFELEdBQVUsU0FEWjs7TUFKa0I7O01BT3BCLG1CQUFxQixDQUFBLENBQUE7ZUFD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QUEsTUFBQSxFQUFRLFFBQUEsQ0FBQSxDQUFBO2FBQ04sR0FBQSxDQUNFO1FBQUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBWDtRQUNBLFFBQUEsRUFBVTtVQUNSLGFBQUEsQ0FDRTtZQUFBLE9BQUEsRUFBUyxJQUFDLENBQUEsS0FBSyxDQUFDO1VBQWhCLENBREYsQ0FEUTtVQUdSLFVBQUEsQ0FDRTtZQUFBLE1BQUEsRUFBUSxTQUFTLENBQUM7VUFBbEIsQ0FERixDQUhROztNQURWLENBREY7SUFETSxDQUFSO0lBVUEsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO2FBQUcsQ0FDUiwrQkFEUSxFQUVJLElBQUMsQ0FBQSxLQUFLLENBQUMsaUJBQW5CLEdBQUEsUUFBQSxHQUFBLE1BRlEsQ0FHVCxDQUFDLElBSFEsQ0FHSCxHQUhHO0lBQUg7RUFWVCxDQURlOztFQWdCakIsVUFBQSxHQUFhLEtBQUssQ0FBQyxXQUFOLENBQ1g7SUFBQSxNQUFBLEVBQVEsUUFBQSxDQUFBLENBQUE7YUFDTixFQUFBLENBQ0U7UUFBQSxTQUFBLEVBQVcsMEJBQVg7UUFDQSxRQUFBLEVBQXFDLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBbEMsR0FBQSxDQUFBLENBQUEsQ0FBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVYsQ0FBaUIsS0FBakIsQ0FBQSxHQUFBO01BRFYsQ0FERjtJQURNO0VBQVIsQ0FEVzs7RUFNYixhQUFBLEdBQWdCLEtBQUssQ0FBQyxXQUFOLENBQ2Q7SUFBQSxNQUFBLEVBQVEsUUFBQSxDQUFBLENBQUE7YUFDTixHQUFBLENBQ0U7UUFBQSxTQUFBLEVBQVcsOEJBQVg7UUFDQSxRQUFBLEVBQVUsVUFEVjtRQUVBLFNBQUEsRUFBVyxJQUFDLENBQUEsS0FBSyxDQUFDO01BRmxCLENBREY7SUFETTtFQUFSLENBRGM7QUFySWhCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgR2FtZVN0YXRlXG4gIGlzWDogdHJ1ZVxuICBwbGF5ZXJYOiAwXG4gIHBsYXllck86IDBcbiAgbW92ZXM6IDBcbiAgd2lubmVyOiBudWxsXG4gIFxuICBnYW1lRmllbGQ6IG51bGxcbiAgXG4gIHdpbm5pbmdOdW1iZXJzOiBbNywgNTYsIDQ0OCwgNzMsIDE0NiwgMjkyLCAyNzMsIDg0XVxuICBcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGdhbWVGaWVsZCA9IChNYXRoLnBvdyggMiwgeCApIGZvciB4IGluIFswLi44XSlcbiAgXG4gIGN1cnJlbnRTeW1ib2w6IC0+XG4gICAgaWYgQGlzWCB0aGVuICd4JyBlbHNlICdvJ1xuICAgICAgXG4gIGN1cnJlbnRQbGF5ZXI6IC0+XG4gICAgaWYgQGlzWCB0aGVuIEBwbGF5ZXJYIGVsc2UgQHBsYXllck9cbiAgICAgIFxuICBjaGVja1dpbkNvbmRpdGlvbnM6IC0+XG4gICAgZm9yIG51bWJlciBpbiBAd2lubmluZ051bWJlcnNcbiAgICAgIGlmIChudW1iZXIgJiBAY3VycmVudFBsYXllcigpKSA9PSBudW1iZXJcbiAgICAgICAgQHdpbm5lciA9IFwiUGxheWVyICN7QGN1cnJlbnRTeW1ib2woKS50b1VwcGVyQ2FzZSgpfVwiXG4gICAgaWYgQG1vdmVzID4gOFxuICAgICAgQHdpbm5lciA9ICdOb2JvZHknXG4gIFxuICB1cGRhdGVDdXJyZW50U3ltYm9sOiAtPlxuICAgIEBpc1ggPSAhQGlzWFxuICBcbiAgdXBkYXRlU3RhdGU6IChpbmRleCkgLT5cbiAgICBpZiBAaXNYXG4gICAgICBAcGxheWVyWCArPSBAZ2FtZUZpZWxkW2luZGV4XVxuICAgIGVsc2VcbiAgICAgIEBwbGF5ZXJPICs9IEBnYW1lRmllbGRbaW5kZXhdXG4gICAgQG1vdmVzKytcbiAgICBAY2hlY2tXaW5Db25kaXRpb25zKClcbiAgICBAdXBkYXRlQ3VycmVudFN5bWJvbCgpXG4gICAgXG4gIHJlc2V0OiAtPlxuICAgIEBpc1ggPSB0cnVlXG4gICAgQHBsYXllclggPSAwXG4gICAgQHBsYXllck8gPSAwXG4gICAgQG1vdmVzID0gMFxuICAgIEB3aW5uZXIgPSBudWxsXG5cbmdhbWVTdGF0ZSA9IG5ldyBHYW1lU3RhdGVcblxue2RpdiwgaDF9ID0gUmVhY3QuRE9NXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ0RPTUNvbnRlbnRMb2FkZWQnLCAtPlxuICBSZWFjdC5yZW5kZXJDb21wb25lbnQgR2FtZUZpZWxkKCksIGRvY3VtZW50LmJvZHlcbiAgXG5HYW1lRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgZ2FtZUlzQmVpbmdQbGF5ZWQ6IGZhbHNlXG5cbiAgcmVuZGVyOiAtPlxuICAgIGRpdlxuICAgICAgY2xhc3NOYW1lOiAndGljLXRhYy10b2UtLWZpZWxkJ1xuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgVGljVGFjVG9lQ2VsbHNNYXRyaXhcbiAgICAgICAgICBvbkNsaWNrOiBAb25DZWxsQ2xpY2tcbiAgICAgICAgICBnYW1lSXNCZWluZ1BsYXllZDogQHN0YXRlLmdhbWVJc0JlaW5nUGxheWVkXG4gICAgICAgIEVuZEdhbWVQb3BPdmVyXG4gICAgICAgICAgb25OZXdHYW1lOiBAb25OZXdHYW1lXG4gICAgICAgICAgZ2FtZUlzQmVpbmdQbGF5ZWQ6IEBzdGF0ZS5nYW1lSXNCZWluZ1BsYXllZFxuICAgICAgXVxuXG4gIG9uTmV3R2FtZTogLT5cbiAgICBnYW1lU3RhdGUucmVzZXQoKVxuICAgIEBzZXRTdGF0ZSBnYW1lSXNCZWluZ1BsYXllZDogdHJ1ZVxuICAgICAgICBcbiAgb25DZWxsQ2xpY2s6IC0+XG4gICAgaWYgZ2FtZVN0YXRlLndpbm5lciAgIFxuICAgICAgQHNldFN0YXRlIGdhbWVJc0JlaW5nUGxheWVkOiBmYWxzZVxuIFxuVGljVGFjVG9lQ2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICBzeW1ib2w6IG51bGxcbiAgXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IC0+XG4gICAgICBAc2V0U3RhdGUgc3ltYm9sOiBudWxsIGlmICFAcHJvcHMuZ2FtZUlzQmVpbmdQbGF5ZWRcbiAgICAgIFxuICByZW5kZXI6IC0+XG4gICAgZGl2XG4gICAgICBjbGFzc05hbWU6IEBjbGFzc2VzKClcbiAgICAgIG9uTW91c2VVcDogQGNsaWNrSGFuZGxlclxuICAgICAgXG4gIGNsYXNzZXM6IC0+XG4gICAgW1xuICAgICAgJ3RpYy10YWMtdG9lLWNlbGwnXG4gICAgICBcIiN7QHN0YXRlLnN5bWJvbH1TeW1ib2xcIiBpZiBAc3RhdGUuc3ltYm9sXG4gICAgXS5qb2luICcgJ1xuICAgICAgXG4gIGNsaWNrSGFuZGxlcjogLT5cbiAgICBpZiAhQHN0YXRlLnN5bWJvbFxuICAgICAgQHNldFN0YXRlIHN5bWJvbDogZ2FtZVN0YXRlLmN1cnJlbnRTeW1ib2woKVxuICAgICAgZ2FtZVN0YXRlLnVwZGF0ZVN0YXRlKEBwcm9wcy5pbmRleClcbiAgICAgIEBwcm9wcy5vbkNsaWNrKClcbiAgICBcblRpY1RhY1RvZUNlbGxzTWF0cml4ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgcmVuZGVyOiAtPlxuICAgIGRpdlxuICAgICAgY2xhc3NOYW1lOiAndGljLXRhYy10b2UtLWNlbGxzLW1hdHJpeCdcbiAgICAgIGNoaWxkcmVuOiBmb3IgaSBpbiBbMC4uOF1cbiAgICAgICAgVGljVGFjVG9lQ2VsbFxuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgICAgZ2FtZUlzQmVpbmdQbGF5ZWQ6IEBwcm9wcy5nYW1lSXNCZWluZ1BsYXllZFxuICAgICAgICAgIG9uQ2xpY2s6IEBwcm9wcy5vbkNsaWNrXG4gICAgXG5FbmRHYW1lUG9wT3ZlciA9IFJlYWN0LmNyZWF0ZUNsYXNzIFxuICByZW5kZXI6IC0+XG4gICAgZGl2XG4gICAgICBjbGFzc05hbWU6IEBjbGFzc2VzKClcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIE5ld0dhbWVCdXR0b25cbiAgICAgICAgICBvbkNsaWNrOiBAcHJvcHMub25OZXdHYW1lXG4gICAgICAgIFRpdGxlTGFiZWxcbiAgICAgICAgICB3aW5uZXI6IGdhbWVTdGF0ZS53aW5uZXJcbiAgICAgIF1cblxuICBjbGFzc2VzOiAtPiBbXG4gICAgICAndGljLXRhYy10b2UtLWVuZC1nYW1lLXBvcG92ZXInXG4gICAgICBcImhpZGRlblwiIGlmIEBwcm9wcy5nYW1lSXNCZWluZ1BsYXllZFxuICAgIF0uam9pbiAnICdcblxuVGl0bGVMYWJlbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gIHJlbmRlcjogLT5cbiAgICBoMVxuICAgICAgY2xhc3NOYW1lOiAndGljLXRhYy10b2UtLXRpdGxlLWxhYmVsJ1xuICAgICAgY2hpbGRyZW46IFwiI3tAcHJvcHMud2lubmVyfSB3aW5zXCIgaWYgQHByb3BzLndpbm5lclxuXG5OZXdHYW1lQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgcmVuZGVyOiAtPlxuICAgIGRpdlxuICAgICAgY2xhc3NOYW1lOiAndGljLXRhYy10b2UtLW5ldy1nYW1lLWJ1dHRvbidcbiAgICAgIGNoaWxkcmVuOiAnTmV3IGdhbWUnXG4gICAgICBvbk1vdXNlVXA6IEBwcm9wcy5vbkNsaWNrIl19
//# sourceURL=coffeescript