<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= COMPANY_NAME?></title>
    <link rel="stylesheet" href="<?= base_url('assets/codebase/webix.min.css')?>">
    <link rel="stylesheet" href="<?= base_url('assets/codebase/style.css')?>">
    <script>var BASE_URL = '<?= base_url()?>';</script>
    <script src="<?= base_url('assets/codebase/webix.js')?>"></script>
    <script src="<?= base_url('assets/codebase/skin.js')?>"></script>    
    <?= mscript([
        'app',
        'login',        
    ])?>
</head>
<body>
    
</body>
</html>