import styled from "styled-components";
export const Container=styled.div`
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
position:fixed;
top:0;
left:0;
right:0;
background:rgba(243,243,244,0.3);
z-index:5;
`
export const Content=styled.div`
width:40%;
height:70%;
// overflow-y:scroll;
background:white;
padding:1rem;
box-sizing:border-box;
position:relative;
border-radius:10px;
button{
    background:rgb(45,136,255);
    color:white;
    font-weight:bold;
    width:100%;
    padding:0.5rem;
    border:none;
    outline:none;
    border-radius:5px;
}
`
export const Title=styled.div`
    font-size:1.5rem;
    font-weight:bold;
    margin:0;
    border-bottom:1px solid black;
    padding:1rem 0;
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    .close{
        position:absolute;
        // top:3%;
        right:2%;
        z-index:5;
        font-size:2rem;
        cursor:pointer;
    }
`
export const WrapEditSection=styled.div`
padding:3%;
`
export const UserInfo=styled.div`
display:flex;
align-items:center;
padding:0.5rem 0;
img{
    width:50px;
    height:50px;
    border-radius:50%;
}
.username{
    font-weight:bold;
    margin-left:2%;;
}
`
export const EditArea=styled.div`
textarea{
    width:100%;
    height:250px;
    resize:none;
    border:none;
    outline:none;
}
`