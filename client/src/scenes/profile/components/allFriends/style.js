import styled from "styled-components";
export const Container=styled.div`
display:flex;
justify-content:center;
background: rgb(240,242,245);
padding-top:20px;
`
export const Content=styled.div`
width:80%;
background:white;
border-radius:10px;
padding:1rem;
`
export const TopContent=styled.div`
display:flex;
justify-content:space-between;
span{
    font-size:1.5rem;
    font-weight:bold;
}
`
export const ListFriends=styled.ul`
padding:0;
list-style-type:none;
display:grid;
grid-template-columns:1fr 1fr;
grid-gap:20px 20px;
li{
    display:flex;
    align-items:center;
    border:1px solid rgb(240,242,245);
    border-radius:10px;
    padding:1rem;
    a{
        width:25%;
        margin-right:10px;
        img{
            width:100%;
            border-radius:10px;
        }

    }
    .username{
        font-weight:bold;
        text-decoration:none;
        color:black;
        &:hover{
            text-decoration:underline;
        }
    }
}
`
export const Search = styled.div`
width:calc(100%/3);
position:relative;
.icon{
    height:100%;
    position:absolute;
    top:0%;
    left:2%;
    display:flex;
    align-items:center;
    svg{
        color:black;
    }

}
input{
    width:100%;
    height:100%;
    border-radius:20px;
    padding:0.3rem 10%;
    outline:none;
    border:none;
    box-sizing:border-box;
    background:rgb(240,242,245);


}
`