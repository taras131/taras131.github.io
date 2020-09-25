   //tab
    const tabs = document.querySelectorAll(`.tab_content`),
          menu = document.querySelector(`.menu`),
          menu_points = document.querySelectorAll(`.menu_link`);

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

    menu.addEventListener(`click`,(event) =>{
        console.log('click');
        const target = event.target;
        if(target&&target.classList.contains(`menu_link`)){
            menu_points.forEach((item1,i) => {
                if(target == item1){
                    hidetab();
                    showtab(i);
                }               
            });
        }
    });

 

   
