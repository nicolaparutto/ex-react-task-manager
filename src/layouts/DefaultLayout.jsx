import { Outlet, NavLink } from "react-router-dom";

function DefaultLayout() {
	return (
		<section className="main-container">
			<header>
				<h1>Task Manager Avanzato</h1>
				<nav>
					<div>
						<span className="home-link"><NavLink to={"/"}>Le mie task</NavLink></span>
						<span className="addtask-link"><NavLink to={"/add-task"}><i className="fa-solid fa-plus"></i></NavLink></span>
					</div>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</section >
	)
}

export default DefaultLayout