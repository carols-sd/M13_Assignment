// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
const $ = (id) => document.getElementById(id)

const createSlideshow = function () {
    console.log("in createSlideShow()")
    // PRIVATE VARIABLES AND FUNCTIONS
    let timer
    let play = true    
    let nodes = { image: null, caption: null }
    let img = { cache: [], counter: 0 }

    let speed = 2000
    
    const stopSlideShow = function () {
        console.log("in stopSlideShow()")
        clearInterval(timer)
    }

    const displayNextImage = function () {
        if (img.counter === img.cache.length) {
            img.counter = 0
        } else {
            img.counter ++
        }
        let image = img.cache[img.counter]
        nodes.image.src = image.src
        nodes.caption.innerHTML = image.title
    }

    const setPlayText = function (btn) {
        console.log("in setPlayText()")
        if (play) {
            btn.value = 'Resume'
        } else {
            btn.value = 'Pause'
        }
    }

    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            for (let i = 0; i < slides.length; i++) {
                let image = new Image()
                image.src = slides[i].href
                image.title = slides[i].title
                img.cache.push(image)
            }
            return this
        },
        startSlideShow: function () {
            console.log("in startSlideShow(), speed=" + speed)

            let me = this  // added by me

            if (arguments.length === 2) {
                nodes.image = arguments[0]
                nodes.caption = arguments[1]
            }
            //timer = setInterval(displayNextImage, 2000)
            timer = setInterval(displayNextImage, me.getSpeed())
            return this
        },
        createToggleHandler: function () {
            console.log("in createToggleHandler()")

            let me = this
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                console.log("in createToggleHandler() return function")

                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this)
                // TOGGLE PLAY 'FLAG'
                play = !play
                console.log("toggled 'play' to " + play)
            }
        },

        getSpeed: function() {
            console.log("in getSpeed()")
            return speed
        },
        setSpeed: function(newSpeed) {
            console.log("in setSpeed()")
            speed = newSpeed
        },
        createSetSpeedHandler: function () {
            console.log("in createSetSpeedHandler()")
         
            let me = this
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            // FOR THE SET_SPEED BUTTON
            return function () {
                console.log("in createSetSpeedHandler() return function")
                let newSpeed = prompt(`Current speed: ${me.getSpeed()}. New speed:`)
                if (newSpeed) {
                    // if new speed entry is non-null, set new speed
                    me.setSpeed(newSpeed)
                    // if slideshow is currently playing, stop it and restart it
                    // so that it now uses the new speed value
                    if (play) {    
                        stopSlideShow()
                        me.startSlideShow()
                    }
                }
            }

        }
    }
}

// CREATE THE SLIDESHOW OBJECT
const slideshow = createSlideshow()

window.addEventListener('load', () => {
    const slides = [
        {href: 'images/backpack.jpg', title: 'He backpacks in the Sierras often'},
        {href: 'images/boat.jpg', title: 'He loves his boat'},
        {href: 'images/camaro.jpg', title: 'He loves his Camaro more'},
        {href: 'images/punk.jpg', title: 'He used to be in a punk band and toured with No Doubt and Sublime'},
        {href: 'images/race.jpg', title: 'He\'s active and loves obstacle coarse racing'},
        {href: 'images/wakesurf.jpg', title: 'He loves to wakesurf behind his boat'}
    ]
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($('image'), $('caption'))
    // PAUSE THE SLIDESHOW
    $('play_pause').onclick = slideshow.createToggleHandler()
    // ADJUST THE SPEED OF THE SLIDESHOW
    $('set_speed').onclick = slideshow.createSetSpeedHandler()
})

