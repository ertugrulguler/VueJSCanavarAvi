new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    game_is_on: false
  },
  methods: {
    start_game: function() {
      this.game_is_on = true;
    },
    attack: function() {
      var point = Math.ceil(Math.random() * 10);
      this.monster_heal -= point;
      this.monster_attack();
    },
    special_attack: function() {
      var point = Math.ceil(Math.random() * 25);
      this.monster_heal -= point;
      this.monster_attack();
    },
    monster_attack: function() {
      var point = Math.ceil(Math.random() * 15);
      this.player_heal -= point;
    },
    heal_up: function() {
      var point = Math.ceil(Math.random() * 25);
      this.player_heal += point;
      this.monster_attack();
    },
    give_up: function() {
      this.player_heal = 0;
      confirm("Yeniden oynamak ister misin ?");
    }
  },

  watch: {
    player_heal: function(value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("Oyunu kaybettin!! Tekrar oynamak ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
        }
      }
      if (value > 100) {
        this.player_heal = 100;
      }
    },

    monster_heal: function(value) {
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm("Oyunu kazandın!! Tekrar oynamak ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
        }
      }
    }
  }
});
