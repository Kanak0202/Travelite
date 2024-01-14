const Profile = ()=>{
    sessionStorage.setItem("previousPage", window.location.pathname);
    return(
        <div>This is my profile</div>
    );
}

export default Profile;