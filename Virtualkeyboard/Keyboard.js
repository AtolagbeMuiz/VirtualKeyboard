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

        //setup keyboard elements with the classes
        this.element.mainkeyboardContainer.classList.add("keyboard", "keyboard--hidden");
        this.element.keysContainer.classList.add("keyboard__keys");

        //this appends the created keys to the keys container
        this.element.keysContainer.appendChild(this._createKeys());

        //this select all keys with the class and initilize the keys array with it
        this.element.keys = this.element.keysContainer.querySelectorAll(".keyboard__key");

        //Add the elements to the DOM (i.e combines the elemnets with each other to create sub-element)
        this.element.mainkeyboardContainer.appendChild(this.element.keysContainer); //appends keys_container to Main keyboard container as a child element
        document.body.appendChild(this.element.mainkeyboardContainer);  //appends the previous step both parent and child element to the document object


        // const useKeyboard = document.querySelector(".keyboard-use");
        // useKeyboard.addEventListener("focus", () => {
        //     this.element.mainkeyboardContainer.classList.remove("keyboard--hidden");
        // });

        document.querySelectorAll(".keyboard-use").forEach(element => {
            element.addEventListener("focus", () =>{
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
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

        let insertLineBreak = false;
        keyLayout.forEach(key => {
            const keyButton = document.createElement("button");
            
            //Add Attribute/classes to each element
            keyButton.setAttribute("type", "button");
            keyButton.classList.add("keyboard__key");


           //const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

           const arrayElements = ["backspace", "p", "enter", "?"];
           
           var indexCheck = arrayElements.indexOf(key);
          // checks if the array contains the key
           if(indexCheck >-1  ){
               insertLineBreak = true;
           }
            else{
                insertLineBreak = false;
            }
                                   

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
                    this._triggerEvent("guy");
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
        if(typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock(){
        //sets the boolean capsLock property to true or false when capsLock is pressed
        this.properties.capsLock = !this.properties.capsLock;

        //loops through the keys 
        for(const key of this.element.keys){

            //checks if the current element being looped through doesnt have a child element; in this case an Icon 
            if(key.childElementCount === 0){
               // key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
               
               if(this.properties.capsLock === true){
                   key.textContent = key.textContent.toUpperCase();
               }
               else{
                key.textContent = key.textContent.toLowerCase();
               }
            }
        }
    },

    open(initialValue, oninput, onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;

        this.element.mainkeyboardContainer.classList.remove("keyboard--hidden");
    },

    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.element.mainkeyboardContainer.classList.add("keyboard--hidden");
        // this.mainkeyboardContainer.querySelectorAll(".keyboard--hidden");
    }
};


window.addEventListener("DOMContentLoaded", function(){
    keyboard.init();
});