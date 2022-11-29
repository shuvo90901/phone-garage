import React from 'react';

const Blog = () => {
    return (
        <div className="min-h-screen">
            <div className='lg:grid grid-cols-2 gap-8 py-10'>
                <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <p className="text-xl font-bold">Q. What are the different ways to manage a state in a React application?</p>
                        <p>In React apps, there are at least seven ways to handle the state. Let us briefly explore a few of them in this part.
                            1.URL,
                            2.Web Storage,
                            3.Loacl State,
                            4.Lifted State,
                            5.Derivade State,
                        </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <p className="text-xl font-bold">Q. How does prototypical inheritance work?</p>
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <p className="text-xl font-bold">Q. What is a unit test? Why should we write unit tests?</p>
                        <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <p className="text-xl font-bold">Q. React vs. Angular vs. Vue?</p>
                        <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blog;