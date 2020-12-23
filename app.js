new Vue({
    el: '#app',
    data: {
        running: false,
        PlayerLife: 100,
        MonsterLife: 100,
        logs: [],
    },
    computed: {
        hasResult() {
            return this.PlayerLife == 0 || this.MonsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.PlayerLife = 100
            this.MonsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('MonsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.MonsterLife > 0) {
                this.hurt('PlayerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('PlayerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.PlayerLife = Math.min(this.PlayerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        },

    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})