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
          modaljob = document.querySelector(`#job`),
          closemodal = document.querySelectorAll(`.modal_close`);
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

    closemodal.forEach((item)=>{
        item.addEventListener(`click`,hidemodal);
    });
    
    modal.addEventListener(`click`,(e)=>{
        if(e.target === modal){
            hidemodal();
        }
    });

    document.addEventListener(`keydown`,(e)=>{
        if(e.code === "Escape" && modal.classList.contains(`show`)) {
            hidemodal();
        }
    });

    const modaltimer = setTimeout(showmodal,15000);
  

    window.addEventListener(`scroll`,()=>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight
            && i < 1){
            showmodal();
        }
    });

    //Forms

    const forms = document.querySelectorAll(`form`);
    const message = {
        loading: `Загрузка`,
        success: `Спасибо, скоро мы с Вами свяжемся`,
        fail: `Что то пошло не так...`
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener(`submit`,(e) => {
            e.preventDefault();

            let statusMessage = document.createElement(`div`);
            statusMessage.classList.add(`status`);
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
                      
            const request = new XMLHttpRequest();
            request.open(`POST`,`server.php`);
 //           request.setRequestHeader(`Content-type`,`multipart/form-date`);

            const formData = new FormData(form);
            request.send(formData);

            request.addEventListener(`load`,()=>{
                if(request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.succes;
                } else {
                    statusMessage.textContent = message.fail;
                }
            });
        });
    }
   

   
 

 

   
