<?php
    $breadcrumb = substr($breadcrumb, 0, strrpos( $breadcrumb, '-'));
    $breadcrumb = (string) trim(str_replace("-", " ", $breadcrumb));
    $fc = mb_strtoupper(mb_substr($breadcrumb, 0, 1));
    $breadcrumb = $fc.mb_substr($breadcrumb, 1);
?>

<?php if($breadcrumb): ?>
    <div class="breadcrumbs">
        <ul class="items">
            <li class="item home">
                <a href="/" data-translate="main"></a>
            </li>

            <li class="item category9">
                <strong><?= $breadcrumb; ?></strong>
            </li>

        </ul>
    </div>
<?php endif; ?>