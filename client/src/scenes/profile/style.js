import styled from "styled-components";
export const Container=styled.div`
display:flex;
justify-content:center;
`
export const Content=styled.div`
width:80%;
`
export const WrapTopContent=styled.div`
display:flex;
justify-content:center;
`
export const WrapMainContent=styled.div`
display:flex;
justify-content:center;
background:rgb(228,230,235);
padding-bottom:20px;
padding-top:20px;

`
export const TopContent=styled.div`
width:80%;
background:white;
`
export const Banner=styled.div`
.wp-cover{
    position:relative;
    .cover-img{
        width:100%;
    }
    .wp-avatar{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        display:flex;
        justify-content:center;
        align-items:end;
        .avatar{
            position:absolute;
            bottom:-10%;
            width:200px;
            height:200px;
            overflow:hidden;
            border:5px solid white;
            border-radius:50%;
        img{
            width:100%;
        }
        }
    }
}
.username{
    text-align:center;
    font-size:1.5rem;
    font-weight:bold;
    margin-top:3rem;
}
`
export const NavBar=styled.div`
display:grid;
grid-template-columns:1fr 1fr;
align-items:center;
// justify-content:space-between;
border-top:1px solid black;
padding:0.3rem 0 0 0;
`
export const LeftBar=styled.ul`
list-style-type:none;
padding:0;
margin:0;
display:flex;
li{

    & a{
        text-decoration:none;
        span{
            font-weight:bold;
            padding:1rem;
            display:block;
            color:black;
            border-radius:5px;
            &:hover{
                background:rgb(228,230,235);
            }
        }
        &::after{
            content:"";
            display:block;
            height:3px;
            width:100%;
        }
        &.active{
            &::after{
                background:rgb(45,136,255);

            }
        }
    }
    
   
}

`
export const RightBar=styled.ul`
list-style-type:none;
padding:0;
margin:0;
display:flex;
justify-content:space-between;
li{
    font-weight:bold;
    padding:0.5rem;
    display:block;
    color:black;
    border-radius:5px;
    cursor:pointer;
    display:flex;
    align-items:center;
    &:hover{
        background:rgb(228,230,235);
    }
    svg{
        margin-right:3%;
    }
}
li:first-child{
    color:rgb(5,113,237);
    background:rgb(231,243,255);
    width:30%;
}
`
export const MainContent=styled.div`
// height:200px;
display:grid;
grid-template-columns:2fr 3fr;
grid-gap:0 20px;
width:80%;
`
export const Sidebar=styled.div``
export const ListPosts=styled.ul`
list-style-type:none;
padding:0;
margin:0;
`