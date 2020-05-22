
$(document).ajaxComplete(function(){
    $('.outline').on('click', function(el){
        const outlineActive = "active-outline";
        let target = el.target;

        if(target.tagName.toLowerCase()==="input"){
            target = target.parentNode;

            if(target.classList.contains(outlineActive))
                target.classList.remove(outlineActive);
            else
                target.classList.add(outlineActive);
        }
    })
});
