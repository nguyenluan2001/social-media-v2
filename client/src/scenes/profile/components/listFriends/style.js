import styled from "styled-components";
export const Container=styled.div`
background:white;
padding:20px;
border-radius:10px;
.title{
    display:flex;
    justify-content:space-between;
    align-items:center;
    & span{
        font-weight:bold;
    }
}
.list-friends{
    list-style-type:none;
    padding:0;
    margin:0;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-gap:10px;
    li{
        a{
            text-decoration:none;
            color:black;
            font-weight:bold;
            &:hover{
                text-decoration:underline;
            }
            .avatar{
                height:135px;
                overflow:hidden;
                border-radius:10px;
                img{
                    width:100%;
                }

            }
        }
    }
}
`