new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    game_is_on: false,
    logs: [],
    attack_multiple:10,
    special_attack_multiple:25,
    monster_attack_multiple:15,
    heal_up_multiple:25,
    log_text:{
      attack:"Oyuncu atağı:",
      special_attack:"Oyuncu özel atağı:",
      monster_attack:"Canavar atağı:",
      heal_up:"İlk yardım:",
      give_up:"Oyuncu pes etti.!!"
    }


  },
  methods: {
    start_game: function() {
      this.game_is_on = true;
    },
    attack: function() {
      var point = Math.ceil(Math.random() * this.attack_multiple);
      this.monster_heal -= point;
      this.monster_attack();
      this.add_to_log({turn:"p",text: this.log_text.attack+point})
    },
    special_attack: function() {
      var point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monster_heal -= point;
      this.monster_attack();
      this.add_to_log({turn:"p",text:this.log_text.special_attack+point})

    },
    monster_attack: function() {
      var point = Math.ceil(Math.random() * this.monster_attack_multiple);
      this.player_heal -= point;
      this.add_to_log({turn:"m",text:this.log_text.monster_attack+point})

    },
    heal_up: function() {
      var point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.player_heal += point;
      this.monster_attack();
      this.add_to_log({turn:"p",text:this.log_text.heal_up+point})

    },
    give_up: function() {
      this.player_heal = 0;
      this.add_to_log({turn:"p",text:this.log_text.give_up})

      confirm("Yeniden oynamak ister misin ?");
    },

    add_to_log:function(data){
      this.logs.push(data);
    }
  },

  watch: {
    player_heal: function(value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("Oyunu kaybettin!! Tekrar oynamak ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs=[];
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
          this.logs=[];

        }
      }
    }
  },

  computed:{
      player_progress:function(){
      return {
        width:this.player_heal+'%'
      };
    },
      monster_progress:function(){
        return {
          width:this.monster_heal+'%'
        };
      }
  }

});
