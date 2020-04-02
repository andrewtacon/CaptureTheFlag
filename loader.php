<?php

    $ai1 = "./dummyAI.js";
    $ai2 = "./dummyAI.js";

    if (isset($_POST["player0"])){
        if ($_POST["player0"]!==""){
            $ai1 = $_POST["player0"];
        }
    }
    if (isset($_POST["player1"])){
        if ($_POST["player1"]!==""){
            $ai2 = $_POST["player1"];
        }
    }

    $ai1Data ="";
    $ai2Data ="";
?>
    
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">

        <style>
        
            html, body {
                margin: 0; 
                height: 100%; 
                overflow: hidden;
            }
            
            body {
                
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
        </style>


		<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
		
<?php

        //load AI1
        if ($ai1!=""){
            try {
                $ai1Data = file_get_contents($ai1);
            } catch (Exception $e) {
            }
        }
        echo "<script>";
        echo "class ai0 {";
        echo "constructor(){this.team = 0;}";
        echo $ai1Data;
        echo "}";
        echo "</script>";
        
        //load AI2
        if ($ai2!=""){
            try{
                $ai2Data = file_get_contents($ai2);
            } catch (Exception $e) {
            }
        }
        echo "<script>";
        echo "class ai1 {";
        echo "constructor(){this.team = 1;}";
        echo $ai2Data;
        echo "}";
        echo "</script>";

?>

		<script src="game.js"></script>
		<script src="ctf.js"></script>
		
	</head>

	<body>

	</body>

</html>





