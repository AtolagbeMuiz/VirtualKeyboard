//Define the keyboard Object
const keyboard = {
    element : {
        mainkeyboardContainer :  null,
        keysContainer : null,
        keys : []
    },

    eventHandlers : {
        oninput : null,
        onclose : null
    },

    properties :{
        value : "",  
        capsLock : false
    },


    init(){

        //Creates Keyboard Element
        keyboard.element.mainkeyboardContainer = document.createElement("div");
        keyboard.element.keysContainer = document.createElement("div");

        //setup keyboard elements
        this.element.mainkeyboardContainer.classList.add("keyboard", "1keyboard--hidden");
        this.element.keysContainer.classList.add("keyboard__keys");

        this.element.keysContainer.appendChild(this._createKeys());

        this.element.keys = this.element.keysContainer.querySelectorAll(".keyboard__key");

        //Add the elemts to the DOM
        this.element.mainkeyboardContainer.appendChild(this.element.keysContainer);
        document.body.appendChild(this.element.mainkeyboardContainer);
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();

        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const createIconElement = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        }

        keyLayout.forEach(key => {
            const keyButton = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            //Add Attribute/classes to each element
            keyButton.setAttribute("type", "button");
            keyButton.classList.add("keyboard__key");
            
           

            switch (key) {
                case "backspace":
                    keyButton.classList.add("keyboard__key--wide");
                    keyButton.innerHTML = createIconElement("backspace");

                    keyButton.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1 );
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyButton.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyButton.innerHTML = createIconElement("keyboard_capslock");

                    keyButton.addEventListener("click", () => {
                       this._toggleCapsLock();
                       keyButton.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyButton.classList.add("keyboard__key--wide");
                    keyButton.innerHTML = createIconElement("keyboard_return");

                    keyButton.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyButton.classList.add("keyboard__key--extra-wide");
                    keyButton.innerHTML = createIconElement("space_bar");

                    keyButton.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                
                case "done":
                    keyButton.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyButton.innerHTML = createIconElement("check_circle");

                    keyButton.addEventListener("click", () => {
                        //this.properties.value += " ";
                        this.close();
                        this._triggerEvent("oninput");
                    });

                    break;

                default :
                keyButton.textContent = key.toLowerCase();
                //keyButton.textContent = key;
                keyButton.addEventListener("click", () => {
                   this.properties.value += this.properties.capsLock? key.toUpperCase() : key;
                    this._triggerEvent("oninput");
                });

                break;
            }

            fragment.appendChild(keyButton);
            
            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
                
            }
        });

        
        return fragment;
    },

    _triggerEvent(handlerName){
        console.log("Event Triggered!... Event Name: " + handlerName);
    },

    _toggleCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;

        for(const key of this.element.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose){

    },

    close(){

    }
};


window.addEventListener("DOMContentLoaded", function(){
    keyboard.init();
});