import React from 'react';

const FormaComponent = ({ username, pass, onPassChange, onUsernameChange, onSubmit },
    context) => {
    return <form onSubmit={onSubmit}>
        <input type="text" value={username} onChange={onUsernameChange} />
        <input type="password" value={pass} onChange={onPassChange} />
        <input type="submit" />
    </form>;
}

export default FormaComponent;