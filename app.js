const app = Vue.createApp({
    data(){
        return {
            a: '',
            b: '',
            c: '',
            triangle:['','',''],
            result: '',
            resClass: 'result'
        }
    },
    watch: {
        triangle: {
            handler(val,oldVal){
                this.checkTriangle(val)
            },
            deep: true
        }
    },
    methods: {
        async check(){
            const res = await fetch('https://randomuser.me/api')
            const { results } = await res.json()     
            // console.log(results) 
            this.firstName = results[0].name.first
            this.lastName = results[0].name.last
            this.gender = results[0].gender
            this.icon = results[0].picture.large
            // alert("you find me!")
        },
        formatInt(event){
            let input = event.target
            let value = input.value.replace(/[^\d]/g,'');
            if(''!=value){
                value = parseInt(value);
            }
            input.value = value            
        },
        sideName(num){
            return String.fromCharCode(num + 97)
        },
        checkTriangle(val){
            this.resClass = 'error'
            if(val.length !== 3 ){
                this.result = '请输入三个有效数字！'
                return
            } 
            let a = parseInt(val[0]), b = parseInt(val[1]), c = parseInt(val[2])
            console.log(a,b,c)

            if(!a || !b || !c){
                this.result = '请输入三个有效数字！'
                return
            }
            if (a <= 0 || b <= 0 || c <= 0){
                this.result = '请输入三个有效数字！'
                return
            }
            
            if (a + b <= c || b + c <= a || c + a <= b) {
                this.result = '无法组成三角形！'
                return
            }

            this.resClass = 'ok'
            var name = '不规则三角形'
            if (a == b && b == c){
               name = '等边三角形'
            }
            else if(a == b || b ==c || c == a) {
                name = '等腰三角形'
            }

            this.result = '结果为：' + name
        }
     }
})
app.mount('#app')