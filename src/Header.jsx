import myImage from './assets/chef_icon.png';
export default function Header(){
    return(
        <header className="header">
            <img className="logo" src={myImage} alt="logo"  />
            <h1 className="name">Chef Nithin</h1>
        </header>
    )
}