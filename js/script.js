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
         console.log(`hamburger click`);
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
    const buttons = document.querySelectorAll("button"),
          closemodal = document.querySelector(".modal_window_close"),
          mailingbutton=  document.querySelector(".modal_window_inputbutton"),
          mailingmodal = document.querySelector(".modal_mailing"),
          modal = document.querySelector(".modal"),
          modalwindow = document.querySelector(".modal_window"),
          modalmailingtitle = document.querySelector(".modal_mailing_title"),
          thank = "Ваше сообщение отправлено";
    
    function showmodal(item1){
        item1.classList.remove("hide");
        item1.classList.add("show");
    }
    function hidemodal(item1){
        item1.classList.remove("show");
        item1.classList.add("hide");
    }
    function showthank(){
        modalmailingtitle.innerHTML =  ` `;
        setTimeout(hidemodal(modal), 7000);
    }

    buttons.forEach((item) =>{
        item.addEventListener(`click`,()=>{
            showmodal(modal);
            closemodal.addEventListener(`click`,()=>{
                hidemodal(modal);
            });
            mailingbutton.addEventListener(`click`,()=>{
                hidemodal(modalwindow);
                showmodal(mailingmodal);
                modalmailingtitle.innerHTML = `Идёт отправка....`;
                setTimeout(showthank, 3000);
            });
        });
    });

   
 

 

   
