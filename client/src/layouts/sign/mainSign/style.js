import styled from "styled-components";
export const Container=styled.div`
background:rgb(240,242,245);
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
form{
    background:white;
    width:100%;
    padding:1rem;
    border-radius:10px;
    input{
        width:100%;
        padding:0.5rem;
        box-sizing:border-box;
        border:1px solid rgb(240,242,245);
        border-radius:5px;
        outline:none;
        font-size:1.2rem;
        margin-bottom:3%;
    }
    select{
        width:100%;
        padding:0.5rem;
        outline:none;
        margin-bottom:3%;
        border:1px solid rgb(240,242,245);
    }
    button{
        display:block;
        width:100%;
        padding:0.8rem 0;
        background:rgb(24,119,242);
        color:white;
        font-size:1.2rem;
        font-weight:bold;
        border-radius:5px;
        border:none;
        cursor:pointer;
    }
    .wp-input{
        padding-bottom:5%;
        border-bottom:1px solid black;
    }
    a{
        display:block;
        text-align:center;
    }
    a.other-btn{
        display:block;
        background:#42b72a;
        color:white;
        font-weight:bold;
        border-radius:5px;
        border:none;
        text-decoration:none;
        padding:0.8rem 0.5rem;
        text-align:center;
        width:50%;
        margin:0px auto;
        margin-top:5%;

    }
}
`
export const Content=styled.div`
display:grid;
grid-template-columns:3fr 2fr;
width:70%;
`

export const Banner=styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:center;
.logo{
    font-size:6rem;
    font-weight:bold;
    color:rgb(24,119,242);
}
`