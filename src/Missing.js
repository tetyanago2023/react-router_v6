import {Link} from "react-router-dom";

const Missing = () => {
    return (
        <main className="Missing">
                <h2>Page not found</h2>
                <p>Well, it is disappointed.</p>
                <p>
                    <Link to="/">Visit our homepage</Link>
                </p>
        </main>
    );
};

export default Missing;