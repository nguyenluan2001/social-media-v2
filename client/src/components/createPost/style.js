import styled from "styled-components";
export const Container=styled.div`
background:white;
padding:0.5rem;
border-radius:10px;
`
export const TopSection=styled.div`
display:flex;
height:50px;
border-bottom:1px solid black;
padding:0.5rem 0rem;;

img{
    width:50px;
    height:50px;
    border-radius:50%;
    margin-right:3%;
}
textarea{
    border:none;
    width:100%;
    height:50px;
    outline:none;
    resize:none;
}
`
export const ListItem=styled.ul`
list-style-type:none;
display:flex;
padding:0;
margin:0;
li{
    display:flex;
    align-items:center;
    padding:0.3rem 0.5rem;
    border-radius:5px;
    cursor:pointer;
    &:hover{
        background:rgb(240,242,245);
    }
}
// li+li{
//     margin-left:5%;
// }
width:100%;
`
export const FootSection=styled.div`
display:flex;
justify-content:space-between;
padding:0.5rem;
.share-btn{
    background:rgb(24,119,242);
    color:white;
    font-weight:bold;
    border:none;
    padding:0.5rem;
    border-radius:5px;
    cursor:pointer;
}
`