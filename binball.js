


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
    finished: true
  },
  computed: {
    title: function() {
      var title = 'BinBall';
      switch(this.mode) {
        case 'teams':
          title += ' - Define Teams';
          break;
        case 'play':
          title += ' - Play';
          break;
      }
      return title;
    }
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
      this.currentRound = 1;
      if (typeof this.numRounds === 'string') {
        this.numRounds = parseInt(this.numRounds);
      }
      for(var i in this.teams) {
        var obj = {
          rounds: [ ],
          total: 0,
          name: this.teams[i]
        };
        for(var j =0; j < this.numRounds; j++) {
          obj.rounds.push(0)
        }
        console.log(obj, this.numRounds)
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
      scorecard.rounds[this.currentRound-1] = score;

      // calculate score
      scorecard.total = 0;
      for(var i = 0; i < this.numRounds; i++) {
        scorecard.total += scorecard.rounds[i];
      }

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

      // set focus
      this.$refs.selector.focus()
    },
    rewind: function() {
      if (this.currentPlayer > 0 || this.currentRound > 1) {
        this.currentPlayer--;
        if (this.currentPlayer < 0) {
          this.currentPlayer = this.teams.length - 1;
          this.currentRound--;
          this.currentAttempt = 0;
          this.$refs.selector.focus()
        }
      }
      ;
    },
    splash: function() {
      this.finished = false;
      this.mode = 'splash';
    }
  }
})