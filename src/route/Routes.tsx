import React, {Fragment, lazy, Suspense, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import {RoutePath} from '../utils/Constant';

import jsonData from '../json/StudentDataSet.json';
import { IStudentJsonFile } from '../features/student/models/Student';
import { saveAllStudents } from '../features/student/actions/StudentActions';

const studentDataSet: IStudentJsonFile = jsonData;

type RoutesType = {
	exact?: boolean;
	path?: string | string[];
	layout?: React.FC;
	component?: React.FC;
	routes?: RoutesType;
	id: string;
}[];

export const RenderRoutes = (routes: RoutesType = []): JSX.Element => {
	const dispatch = useDispatch();
	useEffect(() => {
		// console.log("studentDataSet >>", studentDataSet);
		dispatch(saveAllStudents(studentDataSet));
	}, []);

	return (
		<Suspense
			fallback={
				<div className="suspense_loader">
					Loading...
				</div>
			}>
			<Switch>
				{routes.map((route, i) => {
					const Layout = route.layout || Fragment;
					const Component = route.component;

					return (
						<Route key={i} path={route.path} exact={route.exact}>
							<Layout>
								{route.routes ? RenderRoutes(route.routes) : Component !== undefined ? <Component /> : null}
							</Layout>
						</Route>
					);
				})}
				<Route exact path="/">
					<Redirect to={`${RoutePath.STUDENT_LIST_PATH}`} />
				</Route>
			</Switch>
		</Suspense>
	);
};

const routes: RoutesType = [
	{
		exact: true,
		path: `${RoutePath.STUDENT_LIST_PATH}`,
		layout: MainLayout,
		component: lazy(() => import('../features/student/containers/StudentListContainer')),
		id: `${RoutePath.STUDENT_LIST_PATH}`,
	},
	{
		exact: true,
		path: `${RoutePath.STUDENT_CREATE_PATH}`,
		layout: MainLayout,
		component: lazy(() => import('../features/student/containers/StudentFormContainer')),
		id: `${RoutePath.STUDENT_CREATE_PATH}`,
	},
	{
		exact: true,
		path: `${RoutePath.STUDENT_UPDATE_PATH}`,
		layout: MainLayout,
		component: lazy(() => import('../features/student/containers/StudentFormContainer')),
		id: `${RoutePath.STUDENT_UPDATE_PATH}`,
	},
];

export default routes;
