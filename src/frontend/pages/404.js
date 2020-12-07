export default function Custom404() {
    return (
      <div>
        <a href="/">{"<--- Back..."}</a>
        <style jsx global>
          {`
          body { 
            background: url('/404.png')!important;
            background-repeat: no-repeat;
            overflow: hidden;
            background-size: cover!important
          }
          a {
            color: white;
            padding: 50px;
          }
          `}
        </style>
      </div>
    )
  }