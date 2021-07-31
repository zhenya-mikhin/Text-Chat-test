import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Home} from 'components'

// маршруты
const routes = [
	{path: '/', name: 'Home', Component: Home},
]

export const App = () => (
	<Router>
		<Container>
			<h2 className='mt-2 text-center'>Text Chat</h2>
			<Switch>
				{routes.map(({path, Component}) => (
					<Route key={path} path={path} exact>
						<Component />
					</Route>
				))}
			</Switch>
		</Container>
	</Router>
)