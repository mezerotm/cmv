/* Set the width of the side navigation to 250px */
function openNav1() {
    closeNav();
    document.getElementById("mySidenav1").style.width = "300px";
    document.getElementById("mySidenav1").style.border = "1px solid black";

}

function openNav2() {
    closeNav();
    document.getElementById("mySidenav2").style.width = "300px";
    document.getElementById("mySidenav2").style.border = "1px solid black";
}

function openNav3() {
    closeNav();
    document.getElementById("mySidenav3").style.width = "300px";
    document.getElementById("mySidenav3").style.border = "1px solid black";
}

/* Set the width of the side navigation to 0
@param nav_num the number of the nav bar that is being closed (starts at mySidenav1) */
function closeNav() {
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav1").style.border = "0px solid white";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav2").style.border = "0px solid white";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav3").style.border = "0px solid white";
}