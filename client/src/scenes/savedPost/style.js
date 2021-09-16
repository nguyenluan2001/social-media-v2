import styled from "styled-components";
export const Container=styled.div`
background:rgb(240,242,245);
display:grid;
grid-template-columns:1fr 2fr;
height:100vh;
`
export const LeftContent=styled.div``
export const RightContent=styled.div`
padding-top:20px;
.post-item{
    height:150px;
    display:grid;
    grid-template-columns:1fr 4fr;
    grid-gap:3%;
    background:white;
    padding:1rem;
    border-radius:10px;
    margin-bottom:20px;
    .avatar{
        overflow:hidden;
        img{
            width:100%;
        }
    }
    .content{
        .body{
            font-weight:bold;
        }
    }
}
`