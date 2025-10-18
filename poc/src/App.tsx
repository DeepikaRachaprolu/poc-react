import { useState } from 'react'
import { Button } from "./components/ui/button"
import SaveSegmentDialog from './components/SaveSegmentDialog'

import './App.css'

function App() {

  const [openDialog, setOpenDialog] = useState(false);

  return (
  <>
   <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => setOpenDialog(true)}>Save Segment</Button>
      <SaveSegmentDialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}

   
/>
    </div>
  </>
  )
}

export default App
