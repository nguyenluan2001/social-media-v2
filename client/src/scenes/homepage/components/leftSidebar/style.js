import styled from "styled-components";
export const Container=styled.div`
overflow-y:scroll;
position:sticky;
top:67px;
bottom:0;
height:80vh;
padding:5% 3%;

`
export const ListItem=styled.ul`
list-style-type:none;
padding:0;
margin:0;
li{
    a{
        padding:0.5rem 1rem;
        display:block;
        text-decoration:none;
        color:black;
        svg{
            margin-right:5%;
        }
    }
    &:hover{
        background:rgba(0,0,0,0.1);
    }
}
`
export const ListFriend=styled.ul`
list-style-type:none;
padding:0;
padding-top:20px;
margin:0;
border-top:1px solid rgba(0,0,0,0.5);
li{
    a{
        display:flex;
        align-items:center;
        padding:0.5rem 1rem;
        text-decoration:none;
        color:black;
        img{
            width:30px;
            border-radius:10px;
            margin-right:5%;
        }
    }
    &:hover{
        background:rgba(0,0,0,0.1);
    }
}
`