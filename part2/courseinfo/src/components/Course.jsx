const Course = ({course}) => {
    const Header = ({course}) => {
      return (
        <h1>{course.name}</h1>
      )
    }

    const Content = ({course}) => {
      const Part = ({part}) => {
        return (
          <p>
            {part.name} {part.exercises}
          </p>
        )
      }

      const Total = ({parts}) => {

        const init = 0
        const total = parts.reduce((acc, curr) => acc + curr.exercises, init,)

        return (
          <p style={{fontWeight: 'bold'}}>
            total of {total} exercises
          </p>
        )
      }

      return (
        <>
          {course.parts.map(part => <Part key={part.id} part={part}/>)}
          <Total parts={course.parts} />
        </>
      )
    }

    return (
      <div>
        <Header course={course} />
        <Content course={course} />
      </div>
    )
  }

  export default Course