import { Outlet, NavLink } from "react-router-dom";

function DefaultLayout() {
	return (
		<>
			<header>
				<div>
					<h1>Task Manager Avanzato</h1>
					<nav>
						<ul>
							<li><NavLink to={"/"}>Lista Delle Task</NavLink></li>
							<li><NavLink to={"/add-task"}>Aggiungi Una Task</NavLink></li>
						</ul>
					</nav>
				</div>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>

			</footer>
		</>
	)
}

export default DefaultLayout