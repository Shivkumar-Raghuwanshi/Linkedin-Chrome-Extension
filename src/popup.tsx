
import "~style.css"

function IndexPopup() {
  return (
    <div className="flex items-center justify-center h-screen">
     <div className=" bg-gray-200 px-3">
      <h1 className="text-xl font-bold mb-4">Chrome Extension by Shivkumar Raghuwanshi</h1>
      <div className="flex gap-2">
      <a href="https://www.linkedin.com/in/shivkumar-raghuwanshi/" target="_blank" rel="noopener noreferrer" className="mb-2 underline text-blue-600 hover:text-blue-800 visited:text-purple-600">LinkedIn</a>
      <a href="https://github.com/Shivkumar-Raghuwanshi" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">GitHub</a>
      </div>
    </div>
    </div>
  )
}


export default IndexPopup
