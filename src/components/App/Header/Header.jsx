import checkListLogo from './checklist.jpg'

function Header () {
return (
    <header>
        <div>
            <img src={checkListLogo} />
            <h1>TITANITE TASK LIST</h1>
        </div>
    </header>
    );
}

export default Header;