


var app = new Vue({
  el: '#app',
  data: {
    mode:'splash',
    teams: [],
    newteam: '',
    numRounds: 6,
    scorecard: null,
    currentPlayer: 0,
    currentRound: 1,
    currentAttempt: 0,
    playedJoker: false,
    finished: true
  },
  created: function () {
    
  },
  methods: {
    startTeamSelection: function() {
      this.teams = [];
      this.mode = 'teams';
      this.newteam = '';
    },
    addTeam: function() {
      this.teams.push(this.newteam);
      this.newteam = '';
    },
    startGame: function() {
      if (this.newteam) {
        this.addTeam();
      }
      this.finished = false;
      this.scorecard = [];
      this.hideJoker = false
      this.currentRound = 1;
      for(var i in this.teams) {
        var obj = {
          rounds: [ 0, 0, 0, 0, 0, 0],
          joker: false,
          total: 0,
          name: this.teams[i]
        };
        this.numRounds = obj.rounds.length;
        this.scorecard.push(obj);
      }
      this.currentPlayer = 0;
      this.mode = 'play';
    },
    registerScore: function() {
      var score = 0;
      if (this.currentAttempt === 0) {
        score = 0;
      } else {
        score = 3 + this.currentRound - this.currentAttempt;
      }

      var scorecard = this.scorecard[this.currentPlayer];

      if (this.playedJoker) {
        score *= 2;
        scorecard.joker = true;
      }
      
      scorecard.rounds[this.currentRound-1] = score;
      scorecard.total += score;

      // increment everything
      this.currentPlayer++;
      if (this.currentPlayer == this.teams.length) {
        this.currentPlayer = 0;
        this.currentRound++;
      }
      if (this.currentRound > this.numRounds) {
        this.finished = true;
      }
      this.currentAttempt = 0;
      this.playedJoker = false;

      // set focus
      this.$refs.selector.focus()
    },
    splash: function() {
      this.finished = false;
      this.mode = 'splash';
    }
  }
})