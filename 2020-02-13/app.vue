<template>
  <div id="container">
    <audio controls="" autoplay="" name="media"><source src="/static/music.mp4" type="audio/mp4"></audio>
    <canvas id="canvas" class="background" :width="width" :height="height"></canvas>
    <canvas id="postcard" width="600" height="400"></canvas>
  </div>
</template>

<script>
'use strict'
import _ from 'lodash'
//  文字粒子类
class Point {
  constructor (x, y, context) {
    this.context = context
    this.x = x
    this.y = y
    this.size = 0.2
    this.opacity = 1
    this.dx = 20
    this.dy = 20
    this.ds = 0.005
    this.do = 0.005
  }

  draw () {
    this.context.save()
    this.context.fillStyle = 'rgba(164, 81, 11, 255)'
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true)
    this.context.fill()
    this.context.restore()
  }
}

export default {
  data: function () {
    return {
      context: "HAPPY Valentine's DAY",
      can: null,
      cxt: null,
      width: window.innerWidth,
      height: window.innerHeight,
      particles: [],
      particlesToBeMoved: [],
      points: [],
      particleNum: 1500,
      intervalId: 0,
      power: 1  //  倍率
    }
  },
  mounted () {
    this.getMusic()
    this.initBackground()
    this.draw(this.particles)
    this.context = '亲爱的，我来晚了'
    this.showPicture().then(resolve => {
      this.context = "HAPPY Valentine's day"
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = 'To:JX晶晶，情人节快乐！'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '是不是以为我不理你，哈哈'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '昨天一天都在做这个'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '纯手工撸的，弱弱的哈哈'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '不知道你看到会不会笑一笑呢'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '抱歉不能陪在你身边'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '但是请你相信，我一直很爱你！'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '爱你的，瑜'
      this.clearAnimation()
      return this.showPicture()
    }).then(resolve => {
      this.context = '永远开心，比心~~'
      this.clearAnimation()
      this.showPicture()
    })
    //  this.showPostcard() // 明信片
  },
  beforeDestoryed () {
  },
  methods: {
    initBackground: function () {
      this.can = document.getElementById('canvas')
      this.cxt = this.can.getContext('2d')
      for (let i = 0; i < this.particleNum; i++) {
        this.particles.push({
          position: {x: this.getRandom(this.width), y: this.getRandom(this.height)},
          moveDirec: {x: Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 5, y: Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 5},
          size: this.getRandom(1) * 0.5,
          opacity: this.getRandom(1)
        })
      }
    },
    draw: function () {
      this.cxt.clearRect(0, 0, this.can.width, this.can.height)
      this.particles.concat(this.particlesToBeMoved).forEach(p => {
        this.cxt.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')'
        this.cxt.beginPath()
        this.cxt.arc(p.position.x, p.position.y, p.size * 10, 0, 2 * Math.PI, true)
        this.cxt.fill()
      })
    },
    showPostcard: function () {
      let can = document.getElementById('postcard')
      let points = this.getPoint(can)
      points.forEach(p => {
        p.draw()
      })
    },
    showPicture: function () {
      return new Promise((resolve, reject) => {
        this.makeWords(this.context, this.cxt)
        this.points = this.getPoint(this.can)
        this.cxt.clearRect(0, 0, this.can.width, this.can.height)
        if (this.points.length > this.particleNum) {
          console.log(this.points.length)
          console.log('超出数量')
          resolve()
        } else {
          this.makeAnimation()
          setTimeout(resolve, 10000)
        }
      })
    },
    makeAnimation: function () {
      this.shuffleParticle()
      this.getParticlesToBeMoved()
      this.judgeTheDirect()
      this.intervalId = setInterval(this.moveParticles, 10)
    },
    clearAnimation: function () {
      clearInterval(this.intervalId)
      this.particles.push(...this.particlesToBeMoved)
      this.particlesToBeMoved = []
      this.intervalId = setInterval(this.moveRestParticles, 10)
    },

    shuffleParticle: function () {
      this.particles = _.shuffle(this.particles)
    },
    getParticlesToBeMoved: function () {
      for (let i = 0; i < this.points.length; i++) {
        this.particlesToBeMoved.push(this.particles.shift())
      }
    },
    judgeTheDirect: function () {
      for (let i = 0; i < this.points.length; i++) {
        if (this.points[i].x - this.particlesToBeMoved[i].position.x < 0) {
          this.points[i].dx = -this.points[i].dx
        }
        if (this.points[i].y - this.particlesToBeMoved[i].position.y < 0) {
          this.points[i].dy = -this.points[i].dy
        }
        if (this.points[i].size - this.particlesToBeMoved[i].size < 0) {
          this.points[i].ds = -this.points[i].ds
        }
        if (this.points[i].opacity - this.particlesToBeMoved[i].opacity < 0) {
          this.points[i].do = -this.points[i].do
        }
      }
    },
    moveParticles: function () {
      for (let i = 0; i < this.points.length; i++) {
        if (Math.abs(this.points[i].x - this.particlesToBeMoved[i].position.x) <= Math.abs(this.points[i].dx) || this.particlesToBeMoved[i].position.x < 0) {
          this.particlesToBeMoved[i].position.x = this.points[i].x
        } else {
          this.particlesToBeMoved[i].position.x += this.points[i].dx
        }

        if (Math.abs(this.points[i].y - this.particlesToBeMoved[i].position.y) <= Math.abs(this.points[i].dy) || this.particlesToBeMoved[i].position.y < 0) {
          this.particlesToBeMoved[i].position.y = this.points[i].y
        } else {
          this.particlesToBeMoved[i].position.y += this.points[i].dy
        }
        if (Math.abs(this.points[i].size - this.particlesToBeMoved[i].size) <= Math.abs(this.points[i].ds) || this.particlesToBeMoved[i].size < 0) {
          this.particlesToBeMoved[i].size = this.points[i].size
        } else {
          this.particlesToBeMoved[i].size += this.points[i].ds
        }

        if (Math.abs(this.points[i].opacity - this.particlesToBeMoved[i].opacity) <= Math.abs(this.points.do) || this.particlesToBeMoved[i].opacity < 0) {
          this.particlesToBeMoved[i].opacity = this.points[i].opacity
        } else {
          this.particlesToBeMoved[i].opacity += this.points[i].do
        }
      }
      this.moveRestParticles()
      //  this.draw()
    },
    makeWords: function (word, cxt) {
      cxt.font = '80px Adele bold'
      cxt.fillStyle = 'rgba(100, 100, 100, 256)'
      cxt.fillText(word, this.can.width / 10, this.can.height / 4)
      cxt.save()
    },
    getPoint: function (can) {
      let cxt = can.getContext('2d')
      let imgData = cxt.getImageData(0, 0, can.width, can.height)
      let points = []
      for (let x = 0; x < imgData.width; x += 4) {
        for (let y = 0; y < imgData.height; y += 4) {
          let i = (y * imgData.width + x) * 4
          if (imgData.data[i] <= 128 && imgData.data[i + 1] <= 128 && imgData.data[i + 2] <= 128 && imgData.data[i + 3] >= 128) {
            let point = new Point(x - 3, y - 3, cxt)
            points.push(point)
          }
        }
      }
      return points
    },
    moveRestParticles: function () {
      this.particles.forEach(p => {
        p.position.x += p.moveDirec.x
        p.position.y += p.moveDirec.y
        if (p.position.x > this.width || p.position.x <= 0) {
          p.moveDirec.x = -p.moveDirec.x
        }
        if (p.position.y > this.height || p.position.y <= 0) {
          p.moveDirec.y = -p.moveDirec.y
        }
      })
      this.draw()
    },
    getRandom: function (num) {
      return Math.random() * num
    },
    getMusic: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
}
audio {
  position: absolute;
  z-index: 1000;
}
.background {
  position: absolute;
  background-image: url('../../assets/background.jpg');
}


#postcard {
  /*
  background-image: url('../../assets/postcard.jpg');
  */
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
</style>
