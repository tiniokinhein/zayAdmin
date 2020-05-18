<?php 
	move_uploaded_file($_FILES["image"]["tmp_name"], "foods-imgs/" . $_FILES["image"]["name"]);
?>