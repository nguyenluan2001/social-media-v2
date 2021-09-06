import styled from "styled-components"
export const Container = styled.div`
display:flex;
align-items:center;
background:rgba(45,136,255);
color:white;
padding:1% 3%;
position:sticky;
top:0;
z-index:10;
`
export const Logo = styled.p`
margin:0;
font-size:1.5rem;
font-weight:bold;
width:calc(100%/3);
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
    border-radius:20px;
    padding:0.3rem 6%;
    outline:none;
    border:none;
    box-sizing:border-box;

}
`
export const Links = styled.ul`
&{
    list-style-type:none;
    display:flex;
    margin:0;
    a{
        text-decoration:none;
        color:white;
    }
    li+li{
        margin-left:5%;
    }
}
`
export const Notifications = styled.ul`
&{
    list-style-type:none;
    display:flex;
    margin:0;
    li{
        cursor:pointer;
    }
    li+li{
        margin-left:6%;
    }
}
`
export const User = styled.div`
position:relative;
img{
    width:40px;
    border-radius:50%;
}
.pannel{
    position:absolute;
    background:white;
    right:40%;
    width:120%;
    padding:0.5rem;
    border-radius:10px;
    height:fit-content;
    & a{
        display:flex;
        text-decoration:none;
        color:black;
        padding:0.5rem;
        border-radius:10px;
        &:hover{
            background:rgb(240,242,245);
        }
        .wp-username
        {
            padding-left:0.5rem;
            p{
                margin:0;
            }
            .username{
                font-weight:bold;
            }
        }
    }
    & button{
        border:none;
        border-radius:10px;
        width:100%;
        padding:0.5rem 0rem;
        background:white;
        cursor:pointer;
        &:hover{
            background:rgb(240,242,245);
        }
    }
    
}

`
export const OtherSections = styled.div`
display:grid;
grid-template-columns:repeat(3,1fr);
justify-content:space-between;
align-items:center;
`