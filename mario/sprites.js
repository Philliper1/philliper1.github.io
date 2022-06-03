class Sprite {
    constructor(img, x, y, type) {
        this.img = img
        this.x = x
        this.y = y
        this.w = img.width
        this.h = img.height
        this.type = type
        this.collidable = COLLIDABLES.includes(type) ? true : false
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h)
    }

    getTop() {
        return this.y
    }

    getBottom() {
        return this.y + this.h
    }

    getLeft() {
        return this.x
    }

    getRight() {
        return this.x + this.w
    }

    setTop(y) {
        this.y = y
    }

    setBottom(y) {
        this.y = y - this.h
    }

    setLeft(x) {
        this.x = x
    }

    setRight(x) {
        this.x = x - this.w
    }
}

class AnimatedSprite extends Sprite {
    constructor(img, x, y, type, walking, idle, jumping) {
        super(img, x, y, type)
        this.dx = 0
        this.dy = 0
        this.state = 'idle'
        this.walking = walking
        this.idle = idle
        this.jumping = jumping
    }

    display() {
        if (this.state == 'idle') {
            this.animation = this.idle
        }
        else if (this.state == 'walking') {
            this.animation = this.walking
        }
        else if (this.state == 'jumping') {
            this.animation = this.jumping
        }


        let numImages = this.animation.length
        if (this.dx < 0) {
            push()
            scale(-1, 1)
            image(this.animation[frameCount % numImages], -this.x - this.w, this.y)
            pop()
        }
        else {
            scale(1)
            image(this.animation[frameCount % numImages], this.x, this.y)
        }
    }
}

class Enemy extends AnimatedSprite {
    constructor(img, x, y, type, idle, walking, jumping) {
        super(img, x, y, type)
        this.dx = random(0.5,1.5)
        this.dy = 0
        this.state = 'walking'
        this.walking = walking
        this.jumping = jumping
        this.collidable = COLLIDABLES.includes(type) ? true : false
    }

    update(alienX) {
        if (this.x < alienX) {
            this.x += this.dx
        }
        else if (this.x > alienX) {
            this.x -= this.dx
        }
        this.y += this.dy
        this.dy += 0.6

    }


}