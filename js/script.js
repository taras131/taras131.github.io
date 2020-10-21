window.addEventListener('DOMContentLoaded', function() {
   
   //tab
    const tabs = document.querySelectorAll(`.tab_content`),
          menu = document.querySelector(`.menu`),
          menu_points = document.querySelectorAll(`.menu_link`),
          footermenu = document.querySelector(`.footer1_menu`),
          footermenu_points = document.querySelectorAll(`.footer1_menu_link`);

    function showtab(i=0){
        tabs[i].classList.remove(`tab_hide`);
        tabs[i].classList.add(`tab_show`);
    }

    function hidetab(){
        tabs.forEach( (item) => {
            item.classList.remove(`tab_show`);
            item.classList.add(`tab_hide`);
        });
    }

    showtab();
    menuclick(menu,menu_points);
    menuclick(footermenu,footermenu_points);

    function menuclick(menu,menu_points){
        menu.addEventListener(`click`,(event) =>{
            const target = event.target;
            if((target&&target.classList.contains(`menu_link`)) || (target&&target.classList.contains(`footer1_menu_link`))) {
                menu_points.forEach((item1,i) => {
                    if(target == item1){
                        hidetab();
                        showtab(i);
                    }               
                });
            }
        });
    }

    //hamburger
    const hamburger = document.querySelector(".hamburger"),
    menu_item= document.querySelectorAll(`.menu_item`);
    hamburger.addEventListener(`click` ,(e)=>{
         hamburger.classList.toggle(`hamburger_active`);
         menu.classList.toggle(`menu_active`);    
    });

    menu_item.forEach(item => {
        item.addEventListener(`click` ,(e)=>{       
        hamburger.classList.toggle(`hamburger_active`);
        menu.classList.toggle(`menu_active`);    
    });

    });

    //modal
    const buttonsjob = document.querySelectorAll(`[data-modal="job"]`),
          modal = document.querySelector(`.modal`),
          modaljob = document.querySelector(`#job`);
    let i = 0;
   
    function showmodal(){
        modal.classList.remove("hide");
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        clearInterval(modaltimer);
        i++;
    }

    function hidemodal( ){
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "";
    }
    
    buttonsjob.forEach((item) =>{
        item.addEventListener(`click`,showmodal);
    });
    
    modal.addEventListener(`click`,(e)=>{
        if(e.target === modal || e.target.getAttribute(`data-close`) == ``){
            hidemodal();
        }
    });

    document.addEventListener(`keydown`,(e)=>{
        if(e.code === "Escape" && modal.classList.contains(`show`)) {
            hidemodal();
        }
    });

    const modaltimer = setTimeout(showmodal,50000);
  

    window.addEventListener(`scroll`,()=>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight
            && i < 1){
            showmodal();
        }
    });

    //Forms

    const forms = document.querySelectorAll(`form`);
    const message = {
        loading: `spinner/spinner.svg`,
        success: `Спасибо, скоро мы с Вами свяжемся`,
        fail: `Что то пошло не так...`
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url,data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener(`submit`,(e) => {
            e.preventDefault();

            let statusMessage = document.createElement(`img`);
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.appendChild(statusMessage);
                                
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData(`http://localhost:3000/requests`,json)    
            .then(data => {
                console.log(data);
                showThanksModal(message.success)
                
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.fail)
            }).finally(()=>{
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        const previusModal = document.querySelector(`.modal_dialog`);

        previusModal.classList.remove(`show`);
        previusModal.classList.add(`hide`);
        const thanksModal = document.createElement(`div`);
        thanksModal.classList.add(`modal_dialog`);
        thanksModal.innerHTML = `
            <div class = "modal_content">
                <div class="modal_close" data-close>&times;</div>
                <div class="modal_title"> ${message} </div>
            </div>
        `;

        document.querySelector(`.modal`).append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            previusModal.classList.add(`show`);
            previusModal.classList.remove(`hide`);
            hidemodal();
        } , 4000);
    }

    //db json

   // Используем классы для создание карточек меню

   class Tehnics {
    constructor(brand, model, number, old, parentSelector) {
        this.brand = brand;
        this.model = model;
        this.number = number;
        this.old = old;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            	<div class="tab_content_text_block">
               		<div class="tab_content_text_block_title"> ${this.brand} </div>
              	  	<div class="tab_content_text_block_text"> ${this.model} </div>
              	  	<div class="tab_content_text_block_title"> Гос.Номер </div>
               	 	<div class="tab_content_text_block_text"> ${this.number} </div>
               	 	<div class="tab_content_text_block_title"> Год выпуска </div>
               	 	<div class="tab_content_text_block_text"> ${this.old} </div>
               	 	<button data-modal="job" class="tab_content_text_block_button"> Подробнее </button>
            	</div>                       
		`;
		element.classList.add("col-sm-12","col-md-6","col-xl-3");
        this.parent.append(element);
    }
}

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({brand, model, number, old}) => {
                new Tehnics(brand, model, number, old, "#tehnics").render();
            });
        });

    async function getResource(url) {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
        }

		//Slider
	const slides = document.querySelectorAll(`.tab_content_text_img`),
		  slidenumber = document.querySelector(`.slidenumber`),
		  slidesall = document.querySelector(`.slideall`),
		  left = document.querySelector(`span2`),
		  right = document.querySelector(`span3`),
		  slidesWrapper = document.querySelector(`.slider-wrapper`),
		  slidesField = document.querySelector(`.slider-inner`),
		  width = window.getComputedStyle(slidesWrapper).width;
		  console.log(width);

	let offset = 0,
	    slideIndex = 0;

	slidesField.style.width = 100 * slides.length + `%`;
	slidesField.style.display = `flex`;
	slidesField.style.transition = `0.5s all`;

	slidesWrapper.style.overflow = `hidden`;

	slides.forEach(slide => {
		slide.style.width = width;
	});


	right.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

	left.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
	});






});   

   
