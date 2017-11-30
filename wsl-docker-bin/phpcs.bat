@echo off
set v_params=%*

if defined v_params (
    set v_params=%v_params:\=/% 
)

bash -c "docker_exec phpcs `echo %v_params:"=\"% | sed 's/Y:/\/mnt\/y/i'`"

